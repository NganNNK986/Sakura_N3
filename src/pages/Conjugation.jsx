import { useState } from "react";
import { CONJUGATION_RULES, IRREGULAR_VERBS } from "../data/conjugation";

export default function Conjugation() {
  const [activeTab, setActiveTab] = useState("rules"); // 'rules' or 'irregular'

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg flex-wrap gap-md">
        <div>
          <h2 className="gradient-text">Chia Động Từ</h2>
          <p className="text-muted mt-xs font-medium">
            Sổ tay tra cứu quy tắc và ngoại lệ
          </p>
        </div>
        <div className="glass-tab-container max-w-sm">
          <button
            className={`glass-tab-btn ${activeTab === "rules" ? "active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            Hướng Dẫn Chung
          </button>
          <button
            className={`glass-tab-btn ${activeTab === "irregular" ? "active" : ""}`}
            onClick={() => setActiveTab("irregular")}
          >
            Bất Quy Tắc
          </button>
        </div>
      </div>

      {activeTab === "rules" && (
        <div className="rules-container animate-slideUp">
          {CONJUGATION_RULES.map((rule, idx) => (
            <div key={idx} className="glass-panel p-lg mb-lg hover-float">
              <h3 className="text-2xl font-bold gradient-text mb-xs">
                {rule.form}
              </h3>
              <p className="text-muted mb-md font-medium">{rule.description}</p>

              <div className="conj-grid-3col">
                {/* Nhóm 1 */}
                <div className="conj-cell conj-cell--pink">
                  <div className="font-bold mb-sm badge badge-sakura">
                    Nhóm 1 (Godan)
                  </div>
                  {Array.isArray(rule.group1) ? (
                    <ul className="conj-list">
                      {rule.group1.map((g1, i) => (
                        <li key={i}>
                          <span className="font-medium">{g1.ending}</span>{" "}
                          &rarr;{" "}
                          <span className="jp font-bold text-ink">
                            {g1.change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="jp font-medium">{rule.group1}</div>
                  )}
                </div>

                {/* Nhóm 2 */}
                <div className="conj-cell conj-cell--blue">
                  <div className="font-bold mb-sm badge badge-blue">
                    Nhóm 2 (Ichidan)
                  </div>
                  <div className="jp font-medium conj-pre">
                    {rule.group2}
                  </div>
                </div>

                {/* Nhóm 3 */}
                <div className="conj-cell conj-cell--green">
                  <div className="font-bold mb-sm badge badge-green">
                    Nhóm 3 (Bất quy tắc)
                  </div>
                  <div className="jp font-medium conj-pre">
                    {rule.group3}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "irregular" && (
        <div className="irregular-container animate-slideUp">
          <div className="conj-grid-2col">
            {IRREGULAR_VERBS.map((verb, idx) => (
              <div
                key={idx}
                className="glass-panel p-md hover-float flex-col gap-sm gradient-border-card"
              >
                <div className="flex items-center gap-md mb-xs">
                  <div className="text-4xl font-bold jp gradient-text">
                    {verb.dict}
                  </div>
                  <div>
                    <div className="text-lg jp font-medium">{verb.reading}</div>
                    <div className="text-sm text-muted">{verb.meaning}</div>
                  </div>
                </div>
                <div className="bg-pale p-sm rounded-md">
                  <table className="w-full text-left">
                    <tbody>
                      {verb.forms.map((form, i) => (
                        <tr
                          key={i}
                          className="border-b border-white last:border-0"
                        >
                          <td className="py-xs text-sm font-medium text-muted w-1/3">
                            {form.label}
                          </td>
                          <td className="py-xs jp font-bold">{form.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        /* ── Conjugation 3-column grid ── */
        .conj-grid-3col {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
          align-items: stretch;
        }
        @media (min-width: 768px) {
          .conj-grid-3col {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        /* ── Conjugation 2-column grid ── */
        .conj-grid-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
          align-items: stretch;
        }
        @media (min-width: 768px) {
          .conj-grid-2col {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* ── Grid cell shared ── */
        .conj-cell {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: var(--space-md);
          border-radius: var(--radius-md);
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .conj-cell--pink { background: var(--sakura-50); }
        .conj-cell--blue { background: #e0f2fe; }
        .conj-cell--green { background: #dcfce7; }

        .conj-pre { white-space: pre-line; }

        .conj-list {
          list-style: disc;
          padding-left: var(--space-md);
          margin: 0;
        }
        .conj-list > * + * { margin-top: 0.5rem; }

        .badge-blue { background: #bae6fd; color: #0369a1; }
        .badge-green { background: #bbf7d0; color: #15803d; }
      `}</style>
    </div>
  );
}
