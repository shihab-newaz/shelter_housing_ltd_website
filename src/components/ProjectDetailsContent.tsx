import {
    MapPin,
    Ruler,
    Building,
    Home,
    Calendar,
    Car,
    ArrowUpDown,
    Layers,
    Download,
} from "lucide-react";
import { Project, ProjectStatus } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STYLES = {
    container: "p-6 sm:p-8 space-y-8",
    detailItem: "flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors",
    sectionTitle: "text-xl font-bold text-primary mb-4 flex items-center gap-2",
};

const DetailItem = ({
    icon: Icon,
    label,
    value,
    className
}: {
    icon: any;
    label: string;
    value?: string | number;
    className?: string;
}) => {
    if (!value) return null;
    return (
        <div className={cn(STYLES.detailItem, className)}>
            <div className="p-2 rounded-full bg-white shadow-sm text-gold">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm sm:text-base font-semibold text-primary mt-0.5">{value}</p>
            </div>
        </div>
    );
};

export default function ProjectDetailsContent({ project, className }: { project: Project; className?: string }) {
    if (!project) return null;

    return (
        <div className={cn(STYLES.container, className)}>
            {/* Location */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-sage/5 border border-sage/10">
                <div className="p-2.5 bg-sage/10 rounded-full text-sage shrink-0">
                    <MapPin className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-primary text-lg mb-1">Project Location</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                        {project.details?.fullAddress || project.location}
                    </p>
                </div>
            </div>

            {/* Project Details Grid */}
            <div>
                <h3 className={STYLES.sectionTitle}>
                    <Building className="h-5 w-5 text-gold" />
                    Project Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem icon={Ruler} label="Land Area" value={project.landArea} />
                    <DetailItem icon={Layers} label="No. of Floors" value={project.details?.floors || project.buildingHeight} />
                    <DetailItem icon={Home} label="Total Units" value={project.units ? `${project.units} Units` : undefined} />
                    <DetailItem icon={ArrowUpDown} label="Elevator" value={project.details?.elevator} />
                    <DetailItem icon={Car} label="Parking" value={project.details?.parking} />
                    <DetailItem icon={Calendar} label="Completion" value={project.completionDate} />
                </div>
            </div>

            {/* Flat Sizes */}
            {project.flatSizes && project.flatSizes.length > 0 && (
                <div>
                    <h3 className={STYLES.sectionTitle}>
                        <Home className="h-5 w-5 text-gold" />
                        {project.status === ProjectStatus.COMPLETED ? "Flat Sizes" : "Available Flat Sizes"}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {project.flatSizes.map((size, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="px-4 py-2 text-sm sm:text-base bg-white border border-border shadow-sm text-primary hover:bg-gold/10 hover:border-gold/50 transition-colors"
                            >
                                {size}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Brochure Download Action - Only for Ongoing projects */}
            {project.brochureUrl && project.status === ProjectStatus.ONGOING && (
                <div className="pt-4 border-t border-border">
                    <Button
                        className="w-full sm:w-auto min-w-[200px] bg-gold hover:bg-gold/90 text-primary font-bold text-lg h-14 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-xl gap-3"
                        onClick={() => project.brochureUrl !== "#" && window.open(project.brochureUrl, '_blank')}
                    >
                        <Download className="h-5 w-5" />
                        Download Brochure
                    </Button>
                    <p className="text-center sm:text-left text-sm text-muted-foreground mt-3 ml-1">
                        Get detailed floor plans and pricing information.
                    </p>
                </div>
            )}
        </div>
    );
}
