import { X } from "lucide-react";
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary font-display">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-xl shadow-elegant">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-sage text-white">{project.status}</Badge>
              <Badge className="bg-gold text-primary">{project.type}</Badge>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
              <p className="text-muted-foreground">{project.location}</p>
            </div>
            
            {project.units && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Total Units</h3>
                <p className="text-muted-foreground">{project.units} Residential Units</p>
              </div>
            )}

            {project.completionDate && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Completion Date</h3>
                <p className="text-muted-foreground">{project.completionDate}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Status</h3>
              <p className="text-muted-foreground capitalize">{project.status}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">About This Project</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
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
