import { downloadTextFile } from "@/lib/download-text";

export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escape = (value: string | number) => {
    const str = String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const csv = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
  downloadTextFile(filename, `﻿${csv}`);
}
