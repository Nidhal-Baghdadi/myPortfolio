import { useEffect, useId, useRef, useState } from "react";
import { STATIONS, type StationId } from "@/scene/arena";
import styles from "./ArenaPlan.module.css";
import PlanDrawing from "./PlanDrawing";

/** True when a key press is meant for a text field, not for a page shortcut. */
function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

/**
 * The corner map, plus a full map that opens with the button or the M key. The full map is a native
 * <dialog>: showModal() moves focus into it, makes the page behind inert, closes on Esc and returns focus
 * to the button afterwards, all without extra code.
 */
export default function ArenaPlan({ activeId }: { activeId: StationId }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const active = STATIONS.find((station) => station.id === activeId) ?? STATIONS[0];
  const activeNumber = String(STATIONS.indexOf(active) + 1).padStart(2, "0");

  // Keep the dialog element in step with the state (the element can also close itself, on Esc).
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "m" || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTyping(event.target)) return;
      setOpen((previous) => !previous);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={styles.corner} aria-label="Arena plan">
        <PlanDrawing activeId={activeId} />
        <p className={styles.here}>
          <span className={styles.hereNumber}>{activeNumber}</span> {active.topic}
        </p>
        <button type="button" className={styles.open} onClick={() => setOpen(true)} aria-keyshortcuts="M">
          Map <kbd>M</kbd>
        </button>
      </nav>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={close}
        // A click on the backdrop lands on the dialog element itself, outside its content.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.sheet}>
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              The arena
            </h2>
            <button type="button" className={styles.close} onClick={close}>
              Close <kbd>Esc</kbd>
            </button>
          </header>

          <div className={styles.body}>
            <div className={styles.drawing}>
              <PlanDrawing activeId={activeId} detailed onNavigate={close} />
            </div>

            <div className={styles.side}>
              <nav aria-label="Stations">
                <ol className={styles.stations}>
                  {STATIONS.map((station, i) => (
                    <li key={station.id}>
                      <a
                        className={styles.stationLink}
                        href={`#${station.id}`}
                        aria-current={station.id === activeId ? "location" : undefined}
                        onClick={close}
                      >
                        <span className={styles.stationNumber}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.stationName}>{station.name}</span>
                        <span className={styles.stationTopic}>{station.topic}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <h3 className={styles.legendTitle}>Legend</h3>
              <dl className={styles.legend}>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyHere}`} /></dt>
                  <dd>You are here</dd>
                </div>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyStation}`} /></dt>
                  <dd>Station: select to go there</dd>
                </div>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyRing}`} /></dt>
                  <dd>A station's floor ring</dd>
                </div>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyProp}`} /></dt>
                  <dd>Props and furniture</dd>
                </div>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyStand}`} /></dt>
                  <dd>Stands</dd>
                </div>
                <div>
                  <dt><span className={`${styles.key} ${styles.keyWall}`} /></dt>
                  <dd>Walls; gaps are the gate (south) and the postern (west)</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
