import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Member {
    name: string;
    message: string;
    icon: string; // Emoji as icon if no individual image
    image: string;
}

const members: Member[] = [
    { name: 'RM', message: "Happy Birthday! Semoga tahun ini membawamu lebih banyak kebijaksanaan dan cinta. Keep shining! 🐨", icon: "🐨", image: "/bts/bts-rm.jpg" },
    { name: 'Jungkook', message: "Happy Birthday! Mari kita buat kenangan indah tahun ini. Let's get it! 🐰", icon: "🐰", image: "/bts/bts-jungkook.jpg" },
    { name: 'Jin', message: "Happy Birthday! Ingat, kamu sama 'Worldwide Handsome'-nya sepertiku hari ini! Makan yang enak ya! 🦙", icon: "🦙", image: "/bts/bts-jin.jpg" },
    { name: 'Suga', message: "Selamat ulang tahun. Tetap sehat, tetap bahagia. Jangan terlalu lelah bekerja yaa. Swag. 🐈", icon: "🐈", image: "/bts/bts-suga.jpg" },
    { name: 'J-Hope', message: "I'm your hope! Happy Birthday! Semoga harimu penuh sinar matahari dan tawa! 🐿️", icon: "🐿️", image: "/bts/bts-jhope.jpg" },
    { name: 'Jimin', message: "Happy Birthday! Aku mengirimkan seluruh cintaku padamu. Jangan lupa senyum hari ini! 🐥", icon: "🐥", image: "/bts/bts-jimin.jpg" },
    { name: 'V', message: "I Purple You! 💜 Selamat ulang tahun, semoga hari-harimu seindah musim semi. 🐯", icon: "🐯", image: "/bts/bts-v.jpg" }
];

interface SceneSpecialProps {
    // No props needed for now
}

const SceneSpecial: React.FC<SceneSpecialProps> = () => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [showGroupMessage, setShowGroupMessage] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40 relative overflow-hidden animate-in fade-in duration-800">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="text-center mb-8 z-10 animate-in slide-in-from-top duration-700 fade-in">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-purple-800 dark:text-purple-200 mb-2 drop-shadow-sm">
                    Special wishes for you 💜
                </h1>
                <p className="text-sm text-purple-600 dark:text-purple-300 font-body">
                    Click on all member cards to see what they have to say to you!
                </p>
            </div>

            {/* Grid of Members */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 z-10 max-w-4xl w-full px-4">
                {members.map((member, index) => (
                    <div
                        key={member.name}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedMember(member)}
                        className="w-[calc(50%-0.5rem)] md:w-[calc(25%-1.2rem)] cursor-pointer group relative animate-in zoom-in fade-in duration-500 fill-mode-backwards"
                    >
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white/50 bg-white/30 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-purple-400/50 transform group-hover:-translate-y-1">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Name */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center">
                                <span className="text-white font-bold font-display text-lg drop-shadow-md">
                                    {member.name} {member.icon}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Dialog */}
            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
                <DialogContent className="bg-white/90 backdrop-blur-md border border-purple-200 rounded-2xl max-w-sm md:max-w-md mx-4">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-display text-purple-700 flex items-center justify-center gap-2">
                            {selectedMember?.name} {selectedMember?.icon}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200 shadow-inner">
                            <img
                                src={selectedMember?.image}
                                alt={selectedMember?.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        <DialogDescription className="text-center text-lg text-gray-700 font-body italic leading-relaxed px-2">
                            "{selectedMember?.message}"
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Group Surprise Button */}
            <button
                onClick={() => setShowGroupMessage(true)}
                className="mt-12 text-lg text-purple-400 hover:text-purple-700 underline decoration-dotted transition-colors z-10 animate-in fade-in delay-1000 duration-1000"
            >
                Click Me
            </button>

            {/* Group Message Dialog */}
            <Dialog open={showGroupMessage} onOpenChange={setShowGroupMessage}>
                <DialogContent className="bg-white/95 backdrop-blur-md border border-purple-300 rounded-2xl max-w-md md:max-w-lg mx-4">
                    <DialogHeader className="text-center mb-2">
                        <DialogTitle className="text-2xl font-display text-purple-800">
                            Surprise! 💜
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-purple-100">
                            <img
                                src="/bts/bts-member.jpg"
                                alt="BTS Group"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        <p className="text-center text-xl font-display text-purple-700 italic leading-relaxed px-2 py-2">
                            "Happy 22th Birthday, Semoga kita bisa segera bertemu yaa💜"
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SceneSpecial;
