// A flowchart figure for MDX bodies: boxed nodes joined by drawn arrows, inside
// a labeled hairline frame. Speaks the specimen's mono + hairline language and
// obeys the No-Accent / No-Shadow rules. Purely presentational — no client JS.

type FlowNode = {
  label: string;
  sub?: string; // small qualifier under the label, e.g. "private"
  op?: string; // connector before this node: "or" draws a fork label; default is an arrow
  muted?: boolean; // render as a borderless annotation (e.g. a loop-back note)
};

type FlowRow = {
  lead?: string; // lane label on the left, e.g. "metadata"
  nodes: FlowNode[];
  note?: string; // trailing muted text, e.g. "push + pull"
};

export function Flow({
  title,
  rows,
  caption,
}: {
  title?: string;
  rows: FlowRow[];
  caption?: string;
}) {
  return (
    <figure className="flow">
      {title ? <figcaption className="flow__title">{title}</figcaption> : null}
      <div className="flow__body">
        {rows.map((row, r) => (
          <div key={r} className="flow__row">
            {row.lead ? <span className="flow__lead">{row.lead}</span> : null}
            {row.nodes.map((node, n) => (
              <span key={n} className="flow__step">
                {n > 0 ? (
                  node.op === "or" ? (
                    <span className="flow__fork" aria-hidden>
                      or
                    </span>
                  ) : (
                    <span className="flow__arrow" aria-hidden />
                  )
                ) : null}
                <span
                  className={node.muted ? "flow__node flow__node--note" : "flow__node"}
                >
                  <span className="flow__label">{node.label}</span>
                  {node.sub ? <span className="flow__sub">{node.sub}</span> : null}
                </span>
              </span>
            ))}
            {row.note ? <span className="flow__note">{row.note}</span> : null}
          </div>
        ))}
      </div>
      {caption ? <figcaption className="flow__caption">{caption}</figcaption> : null}
    </figure>
  );
}
