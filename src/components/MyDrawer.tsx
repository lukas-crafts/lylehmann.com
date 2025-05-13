import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { useEffect, useRef } from "react";

export const MyDrawer = () => {
    // Ref for the first focusable element when drawer opens
    const initialFocusRef = useRef<HTMLHeadingElement>(null);
    
    // Handle keyboard navigation and focus management
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                const closeButton = document.querySelector('[aria-label="Close drawer"]') as HTMLButtonElement;
                if (closeButton) closeButton.click();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);
    
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button 
                    variant="default"
                    size="lg"
                    aria-label="Open accessibility resources drawer"
                >
                    Let's Connect
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-background border-t border-border px-4 sm:px-6 max-h-[85vh] overflow-y-auto">
                <DrawerHeader className="sm:pt-6">
                    <DrawerTitle 
                        className="text-xl sm:text-2xl font-bold text-foreground"
                        ref={initialFocusRef}
                        tabIndex={-1} // Will receive focus but won't be tab-navigable
                    >
                        Inclusive Design Resources
                    </DrawerTitle>
                    <DrawerDescription className="text-muted-foreground">
                        Some helpful resources for inclusive UX design and accessibility
                    </DrawerDescription>
                </DrawerHeader>
                <div className="pb-4">
                    <div className="grid gap-4 sm:gap-6">
                        <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                            <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">Web Content Accessibility Guidelines (WCAG)</h3>
                            <p className="text-muted-foreground mb-2 text-sm sm:text-base">The foundation of accessible web design.</p>
                            <a 
                                href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline inline-flex items-center"
                                aria-label="Learn more about WCAG (opens in new tab)"
                            >
                                Learn more
                                <span className="sr-only">(opens in new tab)</span>
                            </a>
                        </div>
                        <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                            <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">Inclusive Design Patterns</h3>
                            <p className="text-muted-foreground mb-2 text-sm sm:text-base">Design patterns that work for everyone, regardless of ability.</p>
                            <a 
                                href="https://inclusivedesignpatterns.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline inline-flex items-center"
                                aria-label="Explore inclusive design patterns (opens in new tab)"
                            >
                                Explore patterns
                                <span className="sr-only">(opens in new tab)</span>
                            </a>
                        </div>
                        <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                            <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">A11Y Project</h3>
                            <p className="text-muted-foreground mb-2 text-sm sm:text-base">A community-driven effort to make web accessibility easier.</p>
                            <a 
                                href="https://www.a11yproject.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline inline-flex items-center"
                                aria-label="Visit A11Y Project website (opens in new tab)"
                            >
                                Visit website
                                <span className="sr-only">(opens in new tab)</span>
                            </a>
                        </div>
                    </div>
                </div>
                <DrawerFooter className="sm:pb-6 flex flex-col sm:flex-row gap-3">
                    <Button 
                        asChild
                        variant="default"
                        size="lg"
                        className="w-full sm:flex-1"
                    >
                        <a 
                            href="/about" 
                            aria-label="Learn more about my work on accessibility"
                        >
                            Learn More About My Work
                        </a>
                    </Button>
                    <DrawerClose asChild>
                        <Button 
                            variant="outline" 
                            className="border-border text-foreground hover:bg-muted w-full sm:flex-1"
                            aria-label="Close drawer"
                        >
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
