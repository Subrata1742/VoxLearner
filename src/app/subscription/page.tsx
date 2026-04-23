import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes"

const SubscriptionPage = () => {
    return (
        <main className="content-wrapper relative z-0">
            <PricingTable
                appearance={{
                    Theme: dark,
                    variables: {
                        colorPrimary: "#e94560",
                        colorBackground: "#ffffff/10",
                        colorForeground: "#ffffff",
                        colorMutedForeground: "rgba(255,255,255,0.6)",
                        colorBorder: "rgba(255,255,255,1)",
                        borderRadius: "20px",
                        fontFamily: "var(--font-geist-sans)",
                    },

                    elements: {


                        pricingTableCard:
                            "relative! bg-white/5! backdrop-blur-md! border-0! rounded-[20px]! p-8! transition-all duration-300! hover:-translate-y-2! ",


                        pricingTableCard__hover:
                            "shadow-[0_15px_35px_rgba(233,69,96,0.2)]! border-[#e94560]/40!",


                        pricingTableCard__before:
                            "content-['']! absolute! top-0! left-0! w-full! h-[2px]! bg-gradient-to-r! from-[#e94560]! to-transparent! scale-x-0! origin-left! transition-transform! duration-300!",

                        pricingTableCard__hoverBefore:
                            "scale-x-100!",


                        pricingTableCardHeader:
                            "text-white! text-xl! font-bold!",



                        pricingTableCardPrice:
                            "text-[#e94560]! text-4xl! font-extrabold!",


                        pricingTableCardFeatures:
                            "text-white!/70!",




                        // BUTTON (matches your gradient buttons)
                        pricingTableCardButton:
                            "bg-linear-to-r! from-[#e94560]! to-[#1a1a2e]! text-white! font-semibold! rounded-xl! h-12!",

                        pricingTableCardButton__hover:
                            "shadow-[0_0_20px_rgba(233,69,96,0.5)]! -translate-y-1!",


                        pricingTableCard__active:
                            "border-[#e94560]! shadow-[0_0_30px_rgba(233,69,96,0.3)]!",


                        pricingTableCardBadge:
                            "bg-[#e94560]! text-white! text-xs! px-3! py-1! rounded-full!",


                        switchIndicator:
                            "group ring-white! data-[checked=true]:bg-[#e94560]! bg-white! ",

                        switchThumb:
                            "bg-[#e94560]!  group-data-[checked=true]:bg-white!",


                        drawerContent:
                            "  bg-[#0f3460]/95! backdrop-blur-xl! border! border-white/10",



                        drawerOverlay:
                            " inset-0! bg-black/70! backdrop-blur-sm!",


                        buttonPrimary:
                            "bg-linear-to-r! from-[#e94560]! to-[#1a1a2e]! text-white!",

                        buttonPrimary__hover:
                            "shadow-[0_0_20px_rgba(233,69,96,0.5)]!",

                        text:
                            "text-white!",

                        formFieldInput:
                            "bg-white/5! border-white/10! text-white!",


                        card:
                            "bg-white/5! border! border-white/10! backdrop-blur-md!",

                    },
                }}
            />
        </main>
    );
};

export default SubscriptionPage;