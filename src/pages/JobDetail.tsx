import { useParams, Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import { ArrowLeft, MapPin, Building2, Clock, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-display)]">
            Job not found
          </h1>
          <p className="text-muted-foreground">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back to listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const typeClass =
    job.type === "Internship"
      ? "bg-[hsl(var(--badge-internship-bg))] text-[hsl(var(--badge-internship-foreground))]"
      : "bg-[hsl(var(--badge-fulltime-bg))] text-[hsl(var(--badge-fulltime-foreground))]";

  const locationClass =
    job.location === "Remote"
      ? "bg-[hsl(var(--badge-remote-bg))] text-[hsl(var(--badge-remote-foreground))]"
      : "bg-[hsl(var(--badge-onsite-bg))] text-[hsl(var(--badge-onsite-foreground))]";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            All Jobs
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        {/* Title area */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeClass}`}>
              {job.type}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 ${locationClass}`}>
              <MapPin size={12} />
              {job.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)] mb-2">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Building2 size={15} className="text-primary/70" />
              {job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {job.postedDaysAgo === 1
                ? "Posted 1 day ago"
                : `Posted ${job.postedDaysAgo} days ago`}
            </span>
          </div>
        </div>

        {/* Description card */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2 font-[family-name:var(--font-display)]">
            <Briefcase size={18} className="text-primary" />
            About this role
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            {job.description}
          </p>
        </div>

        {/* Apply section */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 text-center">
          <h2 className="text-lg font-semibold text-card-foreground mb-2 font-[family-name:var(--font-display)]">
            Interested in this position?
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            Apply now to join {job.company} as a {job.title}.
          </p>
          <Button size="lg" className="gap-2 px-8">
            <ExternalLink size={16} />
            Apply Now
          </Button>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
