import {
  X,
  Download,
  MapPin,
  Ruler,
  Building,
  Home,
  Calendar,
  Car,
  ArrowUpDown,
  Layers,
  CheckCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

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
    <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors", className)}>
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

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-auto sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-0 gap-0 border-none shadow-2xl">

        {/* Header Image Section */}
        <div className="relative h-auto sm:h-[50vh] md:h-[55vh] lg:h-[55vh] w-full overflow-hidden bg-muted/30">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto sm:h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />



          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Badge className="mb-3 bg-gold text-primary hover:bg-gold/90 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {project.status}
            </Badge>
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shadow-sm">
              {project.title}
            </DialogTitle>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Location */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-sage/5 border border-sage/10">
            <div className="p-2.5 bg-sage/10 rounded-full text-sage shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg mb-1">Project Location</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{project.details?.fullAddress || project.location}</p>
            </div>
          </div>

          {/* Project Details Grid */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
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
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-gold" />
                Available Flat Sizes
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

          {/* Brochure Download Action */}
          {project.brochureUrl && (
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
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
