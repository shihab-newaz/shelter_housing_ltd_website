import { Phone } from "lucide-react";
import { socialLinks } from "@/constants/footer";
import { PHONE_NUMBER_HOTLINE } from "@/constants/contacts";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingContactWidget = () => {
    const facebookLink = socialLinks.find((link) => link.label === "Facebook");

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5 md:gap-2 p-1.5 md:p-2 bg-white/5 backdrop-blur-lg backdrop-saturate-150 border border-l-0 border-white/20 rounded-r-2xl shadow-lg transition-transform duration-300 hover:translate-x-1">
            <TooltipProvider delayDuration={0}>
                {facebookLink && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-blue-50/50 text-blue-600 transition-colors"
                                onClick={() => window.open(facebookLink.href, "_blank")}
                            >
                                <facebookLink.icon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Follow us on Facebook</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-green-50/50 text-green-600 transition-colors"
                            onClick={() => window.open(`tel:${PHONE_NUMBER_HOTLINE}`, "_self")}
                        >
                            <Phone className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="sr-only">Call Us</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Call Hotline: {PHONE_NUMBER_HOTLINE}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default FloatingContactWidget;
