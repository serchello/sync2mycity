import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
} from "lucide-react";
import type { ReactNode } from "react";
import HeaderTitle from "../ui/HeaderTitle";
import "../styles/ApplicationView.css";

interface InfoRow {
  label: string;
  value: string;
  highlight?: boolean;
}

const INFO_ROWS: InfoRow[] = [
  { label: "ID", value: "657124" },
  { label: "ΕΙΔΟΣ ΤΕΛΟΥΣ", value: "Ένσταση για Πρόστιμο Στάθμευσης" },
  { label: "ΠΡΟΘΕΣΜΙΑ", value: "20.12.2025" },
  { label: "ΠΟΣΟ", value: "172.97 €", highlight: true },
  { label: "RF", value: "RF231862850275937501875992" },
  { label: "ΚΑΤΑΣΤΑΣΗ", value: "Paid" },
];

const TOTAL_PAGES = 26;

export default function ApplicationView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const viewerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(2);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const rows = INFO_ROWS.map((row) =>
    row.label === "ID" && id ? { ...row, value: id } : row
  );

  const handlePrevPage = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    setPage((current) => Math.min(TOTAL_PAGES, current + 1));
  };

  const handleZoomOut = () => {
    setZoom((current) => Math.max(50, current - 10));
  };

  const handleZoomIn = () => {
    setZoom((current) => Math.min(180, current + 10));
  };

  const handleRotate = () => {
    setRotation((current) => (current + 90) % 360);
  };

  const handleFullscreen = async () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      await viewerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleSavePdf = () => {
    window.print();
  };

  return (
    <div className="main-content application-view">
      <div className="application-view__title">
        <HeaderTitle
          title="Ένσταση για Πρόστιμο Στάθμευσης"
          type="certificates"
        />
      </div>

      <div className="application-view__body">
        <aside className="application-view__info">
          {rows.map((row) => (
            <div key={row.label} className="application-view__info-row">
              <p className="application-view__info-label">{row.label}</p>

              {row.label === "ΚΑΤΑΣΤΑΣΗ" ? (
                <span className="application-view__status">{row.value}</span>
              ) : (
                <p
                  className={`application-view__info-value ${
                    row.highlight ? "application-view__info-value--highlight" : ""
                  }`}
                >
                  {row.value}
                </p>
              )}
            </div>
          ))}

          <button
            type="button"
            className="application-view__back-btn"
            onClick={() => navigate(-1)}
          >
            Πίσω
          </button>
        </aside>

        <section className="pdf-viewer" ref={viewerRef}>
          <div className="pdf-toolbar">
            <div className="pdf-toolbar__filename">Όνομα Αρχείου.pdf</div>

            <div className="pdf-toolbar__group">
              <ToolBtn label="‹" onClick={handlePrevPage} disabled={page === 1} />

              <span className="pdf-toolbar__page">
                {page} / {TOTAL_PAGES}
              </span>

              <ToolBtn
                label="›"
                onClick={handleNextPage}
                disabled={page === TOTAL_PAGES}
              />
            </div>

            <div className="pdf-toolbar__group">
              <ToolIconBtn
                icon={<ZoomOut size={14} />}
                onClick={handleZoomOut}
                disabled={zoom === 50}
                label="Zoom out"
              />

              <span className="pdf-toolbar__zoom">{zoom}%</span>

              <ToolIconBtn
                icon={<ZoomIn size={14} />}
                onClick={handleZoomIn}
                disabled={zoom === 180}
                label="Zoom in"
              />
            </div>

            <div className="pdf-toolbar__group pdf-toolbar__group--right">
              <ToolIconBtn
                icon={<RotateCw size={14} />}
                onClick={handleRotate}
                label="Rotate"
              />

              <ToolIconBtn
                icon={<Maximize size={14} />}
                onClick={handleFullscreen}
                label="Fullscreen"
              />
            </div>
          </div>

          <div className="pdf-viewer__content">
            <div
              className="pdf-page"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              }}
            >
              <p className="pdf-page__label">PDF</p>

              <p className="pdf-page__mock-page">Page {page}</p>

              {[...Array(4)].map((_, index) => (
                <p key={index} className="pdf-page__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur.
                </p>
              ))}
            </div>
          </div>

          <div className="pdf-viewer__footer">
            <button
              type="button"
              className="pdf-save-btn"
              onClick={handleSavePdf}
            >
              <Download size={15} />
              Save PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ToolBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="pdf-tool-btn"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function ToolIconBtn({
  icon,
  onClick,
  disabled,
  label,
}: {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      className="pdf-tool-icon-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {icon}
    </button>
  );
}