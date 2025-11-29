import { X, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-auto sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-background p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary pr-8">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-elegant">
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[50vh] sm:max-h-[60vh] object-cover object-top"
            />
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <Badge className="bg-sage text-white text-xs sm:text-sm capitalize">{project.status}</Badge>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Location</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{project.location}</p>
            </div>
            
            {project.landArea && (
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Land Area</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{project.landArea}</p>
              </div>
            )}

            {project.buildingHeight && (
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Building Height</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{project.buildingHeight}</p>
              </div>
            )}

            {project.units && (
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Total Units</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{project.units} Units</p>
              </div>
            )}

            {project.completionDate && (
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Completion Date</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{project.completionDate}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2">Status</h3>
              <p className="text-muted-foreground capitalize text-sm sm:text-base">{project.status}</p>
            </div>
          </div>

          {/* Flat Sizes */}
          {project.flatSizes && project.flatSizes.length > 0 && (
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-2 sm:mb-3">Flat Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {project.flatSizes.map((size, index) => (
                  <span key={index} className="px-3 py-1.5 bg-sage/10 text-primary rounded-full text-sm">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Brochure Download */}
          {project.brochureUrl && (
            <div>
              <Button 
                variant="outline" 
                className="gap-2 text-primary border-primary/20 hover:bg-primary/5 w-full sm:w-auto active:scale-95 touch-feedback"
                onClick={() => project.brochureUrl !== "#" && window.open(project.brochureUrl, '_blank')}
              >
                <Download className="h-4 w-4" />
                Download Brochure
              </Button>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary mb-2 sm:mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                "Premium finishing throughout",
                "Smart home automation",
                "24/7 security & concierge",
                "Rooftop amenities & lounge",
                "Underground parking",
                "Fitness center & pool",
                "Green spaces & landscaping",
                "Energy-efficient design"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
