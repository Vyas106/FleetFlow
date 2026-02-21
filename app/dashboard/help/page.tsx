import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Search, MessageSquare, Book, Video, ShieldAlert } from "lucide-react"

export default function HelpPage() {
    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col gap-1 items-center text-center max-w-2xl mx-auto py-12">
                <HelpCircle className="h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-black tracking-tight">How can we help?</h1>
                <p className="text-muted-foreground mt-2">Search our knowledge base or reach out to our logistics support team.</p>
                <div className="relative w-full max-w-lg mt-8">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for guides, FAQ, or issues..." className="pl-12 h-12 rounded-full bg-background/50 border-border/50 text-base" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-border/40 hover:border-primary/30 transition-all cursor-pointer group">
                    <CardHeader>
                        <Book className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle>User Guides</CardTitle>
                        <CardDescription>Step-by-step instructions for fleet managers and dispatchers.</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="glass-card border-border/40 hover:border-primary/30 transition-all cursor-pointer group">
                    <CardHeader>
                        <Video className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle>Video Tutorials</CardTitle>
                        <CardDescription>Visual walkthroughs of the FleetFlow platform features.</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="glass-card border-border/40 hover:border-primary/30 transition-all cursor-pointer group">
                    <CardHeader>
                        <ShieldAlert className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle>Safety Protocols</CardTitle>
                        <CardDescription>Best practices for maintains safety standards in the fleet.</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-border/40">
                            <AccordionTrigger>How do I assign a new driver?</AccordionTrigger>
                            <AccordionContent>
                                Navigate to the "Dispatch" module, select a vehicle, and pick an available operator from the list. Once confirmed, the status will automatically update to "On Mission".
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-border/40">
                            <AccordionTrigger>What happens to expired licenses?</AccordionTrigger>
                            <AccordionContent>
                                Our system automatically monitors certification dates. If an operator's credential expires, they are flagged with a red alert and restricted from being assigned to new missions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-border/40">
                            <AccordionTrigger>How can I track maintenance costs?</AccordionTrigger>
                            <AccordionContent>
                                Visit the "Expenses" tab and filter by "Maintenance". This will show you all registered service logs and spare part costs across your entire fleet inventory.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <Card className="glass-card border-primary/20 bg-primary/5 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Direct Support
                        </CardTitle>
                        <CardDescription>Still need help? Our engineers are available 24/7 for logistical support.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <p className="font-bold">24/7 Hotline</p>
                            <p className="text-xl text-primary font-mono">+91 9274043301</p>
                        </div>
                        {/* <div className="flex flex-col gap-1">
                            <p className="font-bold">Technical Email</p>
                            <p className="text-muted-foreground">support@fleetflow.tech</p>
                        </div> */}
                        {/* <Button className="w-full rounded-full h-11 mt-4">Start Live Chat</Button> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
