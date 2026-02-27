"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Mail,
  Database,
  X,
  User,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Hash,
  Shield,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Download,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface BreachResult {
  id?: string;
  dbname?: string;
  email?: string;
  password?: string;
  hash?: string;
  username?: string | string[];
  full_name?: string[];
  first_name?: string[];
  last_name?: string[];
  phone_number?: string;
  phone2?: string;
  number?: string;
  ip?: string;
  city?: string[];
  zip_code?: string;
  postal_code?: string;
  address_street?: string[];
  country?: string[];
  user_birth_date?: string;
  date_birth?: string[];
  created_at?: string;
  activation_date?: string;
  civility?: string;
  gender?: string;
  iban?: string;
  bic?: string;
  [key: string]: unknown;
}

interface SearchResultsProps {
  results: BreachResult[];
  query: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "string") {
    return value;
  }
  return String(value);
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function ResultSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SearchResults({
  results,
  query,
  loading,
  error,
  onClose,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Database className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        {[...Array(3)].map((_, i) => (
          <ResultSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4">
        <Card className="border-red-500/30 bg-red-950/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-400 font-semibold mb-1">
                Erreur lors de la recherche
              </h3>
              <p className="text-red-300/80 text-sm">{error}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mb-6 border border-green-500/20">
              <Shield className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">
              Aucune fuite détectée
            </h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Bonne nouvelle ! Aucune donnée n'a été trouvée pour "<span className="text-white">{query}</span>" dans les bases compromises.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium"
            >
              Nouvelle recherche
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/20">
            <Database className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold flex items-center gap-3">
              {results.length} résultat{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
              <Badge variant="secondary">{query}</Badge>
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">
              Données trouvées dans les bases de données compromises
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Export dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white hover:from-purple-600/30 hover:to-blue-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exporter</span>
            </button>
            <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-2xl min-w-[160px]">
                <button
                  onClick={() => exportToJSON(results, query)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <FileJson className="w-4 h-4 text-yellow-400" />
                  Export JSON
                </button>
                <button
                  onClick={() => exportToCSV(results, query)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-green-400" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {getSourceStats(results).map((stat) => (
          <div
            key={stat.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: stat.color }}
            />
            <span className="text-gray-300 text-xs font-medium">{stat.name}</span>
            <span className="text-white text-xs font-bold bg-white/10 px-1.5 py-0.5 rounded">
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Results */}
      <ScrollArea className="max-h-[600px]">
        <div className="space-y-4 pr-2">
          {results.map((result, index) => (
            <ResultCard key={result.id || index} result={result} index={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function exportToJSON(results: BreachResult[], query: string) {
  const data = {
    query,
    exportedAt: new Date().toISOString(),
    totalResults: results.length,
    results,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `godeye-export-${query}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportToCSV(results: BreachResult[], query: string) {
  if (results.length === 0) return;

  // Récupérer toutes les clés uniques
  const allKeys = new Set<string>();
  results.forEach((r) => {
    Object.keys(r).forEach((key) => allKeys.add(key));
  });
  const headers = Array.from(allKeys);

  // Créer le CSV
  const csvRows = [headers.join(",")];
  results.forEach((result) => {
    const row = headers.map((header) => {
      const value = result[header];
      if (value === undefined || value === null) return "";
      const strValue = Array.isArray(value) ? value.join("; ") : String(value);
      // Escape les guillemets et entoure de guillemets si nécessaire
      if (strValue.includes(",") || strValue.includes('"') || strValue.includes("\n")) {
        return `"${strValue.replace(/"/g, '""')}"`;
      }
      return strValue;
    });
    csvRows.push(row.join(","));
  });

  const blob = new Blob(["\ufeff" + csvRows.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `godeye-export-${query}-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getSourceStats(results: BreachResult[]) {
  const stats: Record<string, number> = {};
  results.forEach((r) => {
    const source = r.dbname || "Unknown";
    stats[source] = (stats[source] || 0) + 1;
  });

  const colors = [
    "#8b5cf6",
    "#3b82f6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
  ];
  return Object.entries(stats).map(([name, count], i) => ({
    name,
    count,
    color: colors[i % colors.length],
  }));
}

function ResultCard({
  result,
  index,
}: {
  result: BreachResult;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const [showSensitive, setShowSensitive] = useState(false);

  const fullName = result.full_name
    ? formatValue(result.full_name)
    : result.first_name && result.last_name
    ? `${formatValue(result.first_name)} ${formatValue(result.last_name)}`
    : null;

  const phone = result.phone_number || result.phone2 || result.number;
  const address = result.address_street
    ? formatValue(result.address_street)
    : null;
  const zipCity = [
    result.zip_code || result.postal_code,
    result.city ? formatValue(result.city) : null,
  ]
    .filter(Boolean)
    .join(" ");
  const birthDate =
    result.user_birth_date ||
    (result.date_birth ? formatValue(result.date_birth) : null);
  const username = result.username ? formatValue(result.username) : null;

  const hasSensitiveData = result.password || result.hash || result.iban;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        expanded ? "border-purple-500/30" : "hover:border-white/20"
      )}
    >
      {/* Header clickable */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center border border-purple-500/20">
            <span className="text-white font-bold text-sm">
              {(result.dbname || "?")[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>{result.dbname || "Source inconnue"}</Badge>
              {result.activation_date && (
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(result.activation_date)}
                </span>
              )}
              {hasSensitiveData && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Sensible
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1.5">
              {fullName || result.email || username || "Données disponibles"}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "p-2 rounded-lg transition-colors",
            expanded ? "bg-purple-500/10" : "bg-white/5"
          )}
        >
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-purple-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <CardContent className="pt-0 pb-5">
          <div className="border-t border-white/10 pt-4">
            {/* Toggle sensitive */}
            {hasSensitiveData && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSensitive(!showSensitive);
                }}
                className="flex items-center gap-2 text-xs mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                {showSensitive ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    Masquer les données sensibles
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    Afficher les données sensibles
                  </>
                )}
              </button>
            )}

            {/* Data grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {fullName && (
                <DataField
                  icon={<User className="w-4 h-4" />}
                  label="Nom complet"
                  value={fullName}
                />
              )}
              {result.email && (
                <DataField
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={result.email}
                  copyable
                />
              )}
              {username && (
                <DataField
                  icon={<Hash className="w-4 h-4" />}
                  label="Username"
                  value={username}
                  copyable
                />
              )}
              {phone && (
                <DataField
                  icon={<Phone className="w-4 h-4" />}
                  label="Téléphone"
                  value={phone}
                  copyable
                />
              )}
              {birthDate && (
                <DataField
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date de naissance"
                  value={formatDate(birthDate)}
                />
              )}
              {address && (
                <DataField
                  icon={<MapPin className="w-4 h-4" />}
                  label="Adresse"
                  value={address}
                />
              )}
              {zipCity && (
                <DataField
                  icon={<MapPin className="w-4 h-4" />}
                  label="Ville"
                  value={zipCity}
                />
              )}
              {result.country && (
                <DataField
                  icon={<Globe className="w-4 h-4" />}
                  label="Pays"
                  value={formatValue(result.country)}
                />
              )}
              {result.ip && (
                <DataField
                  icon={<Globe className="w-4 h-4" />}
                  label="Adresse IP"
                  value={result.ip}
                  mono
                  copyable
                />
              )}
              {showSensitive && result.password && (
                <DataField
                  icon={<AlertTriangle className="w-4 h-4" />}
                  label="Mot de passe"
                  value={result.password}
                  sensitive
                  copyable
                />
              )}
              {showSensitive && result.hash && (
                <DataField
                  icon={<Hash className="w-4 h-4" />}
                  label="Hash"
                  value={result.hash}
                  mono
                  sensitive
                  copyable
                  className="md:col-span-2"
                />
              )}
              {showSensitive && result.iban && (
                <DataField
                  icon={<AlertTriangle className="w-4 h-4" />}
                  label="IBAN"
                  value={result.iban}
                  sensitive
                  copyable
                />
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

interface DataFieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  sensitive?: boolean;
  mono?: boolean;
  copyable?: boolean;
  className?: string;
}

function DataField({
  icon,
  label,
  value,
  sensitive,
  mono,
  copyable,
  className,
}: DataFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 rounded-xl p-3.5 transition-all",
        sensitive
          ? "bg-red-500/10 border border-red-500/20"
          : "bg-white/5 hover:bg-white/[0.07]",
        className
      )}
    >
      {icon && (
        <span className={cn("mt-0.5", sensitive ? "text-red-400" : "text-gray-400")}>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider font-medium">
          {label}
        </p>
        <p
          className={cn(
            "text-sm break-all leading-relaxed",
            mono && "font-mono text-xs",
            sensitive ? "text-red-300" : "text-white"
          )}
        >
          {value}
        </p>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg",
            copied ? "bg-green-500/20" : "hover:bg-white/10"
          )}
          title="Copier"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
}
