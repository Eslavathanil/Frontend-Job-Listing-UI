import { Job } from "@/data/jobs";
import { MapPin, Building2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
  searchTerm: string;
}

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const JobCard = ({ job, searchTerm }: JobCardProps) => {
  const typeClass =
    job.type === "Internship"
      ? "bg-[hsl(var(--badge-internship-bg))] text-[hsl(var(--badge-internship-foreground))]"
      : "bg-[hsl(var(--badge-fulltime-bg))] text-[hsl(var(--badge-fulltime-foreground))]";

  const locationClass =
    job.location === "Remote"
      ? "bg-[hsl(var(--badge-remote-bg))] text-[hsl(var(--badge-remote-foreground))]"
      : "bg-[hsl(var(--badge-onsite-bg))] text-[hsl(var(--badge-onsite-foreground))]";

  return (
    <Link to={`/jobs/${job.id}`} className="block group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-card-foreground leading-snug">
          {highlightText(job.title, searchTerm)}
        </h3>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${typeClass}`}>
          {job.type}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Building2 size={14} className="text-primary/70" />
          {job.company}
        </span>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${locationClass}`}>
          <MapPin size={12} />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5 ml-auto text-xs">
          <Clock size={12} />
          {job.postedDaysAgo === 1 ? "1 day ago" : `${job.postedDaysAgo} days ago`}
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
