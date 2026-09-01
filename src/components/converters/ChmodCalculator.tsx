'use client';

import { useState } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';
import { cn } from '@/lib/utils';

type Permission = 'read' | 'write' | 'execute';

const PERMISSIONS: { key: Permission; label: string; symbol: string; value: number }[] = [
  { key: 'read', label: 'Read', symbol: 'r', value: 4 },
  { key: 'write', label: 'Write', symbol: 'w', value: 2 },
  { key: 'execute', label: 'Execute', symbol: 'x', value: 1 },
];

const GROUPS = ['owner', 'group', 'others'] as const;
type Group = (typeof GROUPS)[number];

const GROUP_LABELS: Record<Group, string> = {
  owner: 'Owner (u)',
  group: 'Group (g)',
  others: 'Others (o)',
};

/** Her grup icin 0-7 arasi izin degeri. */
function octalFor(perms: Record<Group, Set<Permission>>, group: Group): number {
  let value = 0;
  for (const p of PERMISSIONS) {
    if (perms[group].has(p.key)) value += p.value;
  }
  return value;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
    >
      {copied ? 'Copied ✓' : label}
    </button>
  );
}

function CheckCell({
  checked,
  onChange,
  title,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      title={title}
      className={cn(
        'flex h-11 w-full items-center justify-center rounded-xl border font-mono text-sm font-semibold transition-all',
        checked
          ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.25)] dark:text-emerald-400'
          : 'border-zinc-200 bg-zinc-100/70 text-zinc-400 hover:bg-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-600 dark:hover:bg-zinc-800'
      )}
    >
      {checked ? '1' : '0'}
    </button>
  );
}

export default function ChmodCalculator() {
  const [isDirectory, setIsDirectory] = useState(false);
  const [perms, setPerms] = useState<Record<Group, Set<Permission>>>(() => ({
    owner: new Set(['read', 'write', 'execute']),
    group: new Set(['read', 'execute']),
    others: new Set(['read', 'execute']),
  }));

  const toggle = (group: Group, perm: Permission) => {
    setPerms((prev) => {
      const next = new Set(prev[group]);
      if (next.has(perm)) next.delete(perm);
      else next.add(perm);
      return { ...prev, [group]: next };
    });
  };

  const numeric = GROUPS.map((g) => octalFor(perms, g)).join('');
  const symbolic = GROUPS.map((g) =>
    PERMISSIONS.map((p) => (perms[g].has(p.key) ? p.symbol : '-')).join('')
  ).join('');
  const typeChar = isDirectory ? 'd' : '-';
  const symbolicFull = `${typeChar}${symbolic}`;

  return (
    <ConverterShell from="Permissions" to="Chmod">
      <ConverterHeading
        title="Chmod Calculator"
        description="Toggle read, write and execute permissions for the owner, group and others — get the numeric (755) and symbolic (-rwxr-xr-x) chmod value instantly, right in your browser."
      />

      <div className="flex w-full flex-col gap-6">
        {/* Dosya / dizin tipi secici (sembolik gosterimi etkiler) */}
        <div className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100/70 p-2 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          {[
            { label: 'File ( - )', value: false },
            { label: 'Directory ( d )', value: true },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setIsDirectory(opt.value)}
              className={cn(
                'rounded-lg px-3 py-1.5 font-mono text-xs transition-colors',
                isDirectory === opt.value
                  ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Izın grid'i: her grup icin Read/Write/Execute checkbox'ları */}
        <div className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500" />
          {PERMISSIONS.map((p) => (
            <span
              key={p.key}
              className="text-center font-mono text-[11px] uppercase tracking-wider text-zinc-500"
              title={`${p.label} (+${p.value})`}
            >
              {p.symbol}
            </span>
          ))}

          {GROUPS.map((group) => (
            <RowGroup
              key={group}
              label={GROUP_LABELS[group]}
              value={octalFor(perms, group)}
              group={group}
              perms={perms}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>

      {/* Sonuc: sayisal + sembolik */}
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Numeric
            </span>
            <CopyButton value={numeric} label="Copy" />
          </div>
          <p className="font-mono text-4xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-300">
            chmod {numeric}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Symbolic
            </span>
            <CopyButton value={symbolicFull} label="Copy" />
          </div>
          <p className="font-mono text-4xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-300">
            {symbolicFull}
          </p>
        </div>
      </div>

      <p className="font-mono text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
        r=4 · w=2 · x=1 — e.g. <span className="text-zinc-700 dark:text-zinc-300">755</span> ={' '}
        <span className="text-zinc-700 dark:text-zinc-300">-rwxr-xr-x</span> (owner full, group &
        others read+execute).
      </p>
    </ConverterShell>
  );
}

/** Bir satır: gorunmez baslik hucresi + 3 izin checkbox'ı. */
function RowGroup({
  label,
  value,
  group,
  perms,
  onToggle,
}: {
  label: string;
  value: number;
  group: Group;
  perms: Record<Group, Set<Permission>>;
  onToggle: (group: Group, perm: Permission) => void;
}) {
  return (
    <>
      <span className="flex flex-wrap items-baseline gap-x-2 pr-1">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="font-mono text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
          {value}
        </span>
      </span>
      {PERMISSIONS.map((p) => (
        <CheckCell
          key={p.key}
          checked={perms[group].has(p.key)}
          onChange={() => onToggle(group, p.key)}
          title={`${label} — ${p.label}`}
        />
      ))}
    </>
  );
}
