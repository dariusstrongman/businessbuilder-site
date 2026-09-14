"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { businessTypes } from "@/lib/content";
import { brand } from "@/lib/brand";
import { Arrow, Check } from "./ui";

type Scope = "business" | "website" | "run";
const labels: Record<Scope, string> = {
  business: "Build my business",
  website: "Build my professional website",
  run: "Build & run my business",
};
const IntakeContext = createContext<
  (scope?: Scope, category?: string, media?: string) => void
>(() => {});

export function BuildButton({
  children = "Build my business",
  scope = "business",
  category,
  media,
  className = "button button-primary",
}: {
  children?: ReactNode;
  scope?: Scope;
  category?: string;
  media?: string;
  className?: string;
}) {
  const open = useContext(IntakeContext);
  return (
    <button className={className} onClick={() => open(scope, category, media)}>
      {children}
      <Arrow />
    </button>
  );
}

export function IntakeProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [scope, setScope] = useState<Scope>("business");
  const [category, setCategory] = useState<string>(businessTypes[0].name);
  const [stage, setStage] = useState("An idea I want to build");
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(false);
  const [media, setMedia] = useState("Both");
  const [downloaded, setDownloaded] = useState(false);
  function open(
    nextScope: Scope = "business",
    nextCategory?: string,
    nextMedia?: string,
  ) {
    setScope(nextScope);
    if (nextCategory) setCategory(nextCategory);
    if (nextMedia) setMedia(nextMedia);
    setReview(false);
    setDownloaded(false);
    dialog.current?.showModal();
    document.body.classList.add("dialog-open");
  }
  function close() {
    dialog.current?.close();
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    setReview(true);
    requestAnimationFrame(() =>
      dialog.current?.querySelector<HTMLElement>("h2")?.focus(),
    );
  }
  function download() {
    const text = `${brand.name.toUpperCase()} — FOUNDER BRIEF\n\nScope: ${labels[scope]}\nBusiness: ${category}${category === "Photography & Videography" ? ` (${media})` : ""}\nStage: ${stage}\n\n${description}\n\nLocal preview only. This brief has not been submitted. Scope, pricing, availability, and any external-service costs require agreement before work begins.\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "business-builder-brief.txt";
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }
  return (
    <IntakeContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="intake-dialog"
        aria-labelledby="intake-title"
        aria-describedby="intake-disclosure"
        onClose={() => document.body.classList.remove("dialog-open")}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = dialog.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
          );
          if (!controls?.length) return;
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onClick={(e) => {
          if (e.target === dialog.current) {
            const r = dialog.current.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              close();
          }
        }}
      >
        <button
          className="dialog-close"
          onClick={close}
          aria-label="Close business brief"
        >
          ×
        </button>
        <p className="eyebrow">
          YOUR NEXT CHAPTER <span className="muted">/ BRIEF PREVIEW</span>
        </p>
        <h2 id="intake-title" tabIndex={-1}>
          {review ? "A good place to begin." : "What would you like to build?"}
        </h2>
        <p id="intake-disclosure" className="dialog-intro">
          Explore your founder brief. This preview stays in this tab; nothing is
          submitted and no account is created.
        </p>
        {!review ? (
          <form onSubmit={submit}>
            <label htmlFor="scope">What do you need?</label>
            <select
              id="scope"
              value={scope}
              onChange={(e) => setScope(e.target.value as Scope)}
            >
              {Object.entries(labels).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="form-grid">
              <div>
                <label htmlFor="category">Your business</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {businessTypes.map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="stage">Where are you now?</label>
                <select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option>An idea I want to build</option>
                  <option>An existing business</option>
                </select>
              </div>
            </div>
            {category === "Photography & Videography" && (
              <>
                <label htmlFor="media">Your focus</label>
                <select
                  id="media"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                >
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Both</option>
                </select>
              </>
            )}
            <label htmlFor="description">
              Tell us about the business you have in mind
            </label>
            <textarea
              id="description"
              required
              minLength={15}
              maxLength={1500}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you offer, where will you work, and what would you like help with?"
              aria-describedby="description-help"
            />
            <p className="field-help" id="description-help">
              15–1,500 characters. Leave out private or sensitive information.
            </p>
            <button type="submit" className="button button-primary">
              Review my brief
              <Arrow />
            </button>
          </form>
        ) : (
          <div className="brief-review">
            <div className="review-summary">
              <p className="eyebrow">YOUR STARTING POINT</p>
              <h3>
                {category === "Photography & Videography" && media !== "Both"
                  ? media
                  : category}
              </h3>
              <p>
                {labels[scope]} · {stage}
              </p>
              <p className="brief-description">{description}</p>
            </div>
            <h3>What would happen next</h3>
            <ol>
              <li>Understand your goals and constraints.</li>
              <li>Research the direction and recommend a scope.</li>
              <li>Review costs and dependencies before approving a build.</li>
            </ol>
            <p className="field-help">
              Pricing and launch availability are not finalized. You can
              download your brief for your own records.
            </p>
            <div className="dialog-actions">
              <button className="button button-primary" onClick={download}>
                Download my brief
                <Arrow />
              </button>
              <button className="text-link" onClick={() => setReview(false)}>
                Edit brief
              </button>
            </div>
            <p role="status" className="download-status">
              {downloaded && (
                <>
                  <Check /> Brief downloaded. Nothing was submitted.
                </>
              )}
            </p>
          </div>
        )}
      </dialog>
    </IntakeContext.Provider>
  );
}
