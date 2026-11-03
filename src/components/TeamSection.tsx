import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Award, ShieldCheck, Briefcase } from "lucide-react";
import { getTeamMembers, type TeamMember } from "@/lib/teamStore";

interface TeamSectionProps {
  className?: string;
  bgLight?: boolean;
}

export default function TeamSection({ className = "", bgLight = true }: TeamSectionProps) {
  const [team, setTeam] = useState<TeamMember[]>(getTeamMembers());

  useEffect(() => {
    const handleUpdate = () => {
      setTeam(getTeamMembers());
    };
    window.addEventListener("aa_spaces_team_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("aa_spaces_team_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <section className={`py-20 ${bgLight ? "bg-[#f8fafc]" : "bg-white"} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            Executive Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#0f2b48] tracking-tight mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            The structural engineering expertise, precision fabrication QA, and trusted turnkey execution behind every AA Spaces pre-engineered building.
          </p>
        </div>

        {/* Dynamic Leadership Cards Grid */}
        <div className={`grid grid-cols-1 ${team.length === 1 ? "max-w-md" : team.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-2 lg:grid-cols-3 max-w-6xl"} gap-8 mx-auto`}>
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder if custom link broken
                    (e.target as HTMLImageElement).src =
                      member.id === "upender"
                        ? "/assets/team/upender-reddy.jpg"
                        : "/assets/team/gangadhar.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Experience Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0f2b48] shadow-sm flex items-center gap-1.5 border border-slate-100">
                  <Briefcase className="w-3 h-3 text-amber-500" />
                  {member.experience}
                </div>

                {/* Overlaid Title on Photo Bottom */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white leading-snug drop-shadow-sm">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      {member.role}
                    </span>
                    {member.qualification && (
                      <span className="text-[11px] text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
                        {member.qualification}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Bottom / Contact */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>In-House Shadnagar QA & Turnkey Delivery Direction</span>
                  </div>
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0f2b48] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0f2b48] transition-all text-xs font-bold tracking-wide group/btn"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-white transition-colors" />
                  {member.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
