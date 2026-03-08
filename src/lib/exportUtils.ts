export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = val == null ? "" : String(val);
        return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

export function exportToPDF(title: string, sections: { heading: string; rows: string[][] }[]) {
  // Generate a simple HTML-based printable report
  const html = `
<!DOCTYPE html>
<html><head><title>${title}</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 40px; color: #1a1a1a; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  h2 { font-size: 16px; margin-top: 24px; color: #555; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
  th, td { text-align: left; padding: 6px 12px; border-bottom: 1px solid #e0e0e0; }
  th { background: #f5f5f5; font-weight: 600; }
  .meta { font-size: 12px; color: #888; margin-bottom: 24px; }
</style></head><body>
<h1>${title}</h1>
<p class="meta">Generated ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
${sections.map(s => `
<h2>${s.heading}</h2>
<table>
<thead><tr>${s.rows[0]?.map(h => `<th>${h}</th>`).join("") || ""}</tr></thead>
<tbody>${s.rows.slice(1).map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
</table>
`).join("")}
</body></html>`;
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 300);
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
