import React from "react";
import Particles from "react-tsparticles";

const FuturisticBackground = () => {
    return (
        <Particles
            id="tsparticles"
            options={{
                fullScreen: { enable: false },
                background: {
                    color: { value: "#0d0d0d" }
                },
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#00fff0"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 0.5,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#00fff0",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "out"
                        }
                    }
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse"
                        },
                        onClick: {
                            enable: true,
                            mode: "push"
                        }
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            quantity: 4
                        }
                    }
                },
                detectRetina: true
            }}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: "none" // Make sure it doesn't block form input
            }}
        />
    );
};

export default FuturisticBackground;
