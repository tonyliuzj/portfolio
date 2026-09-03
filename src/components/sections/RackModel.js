import { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Server, Route, HardDrive, Cable, PlugZap, Monitor,
    Keyboard, Thermometer, Network,
    Activity, Shield, Cpu, Zap
} from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";

const HardwareVisual = memo(function HardwareVisual({ device, isSelected }) {
    // Base metal finish
    const metalBg = "bg-gradient-to-b from-[#2a2a2a] via-[#1f1f1f] to-[#141414] border-t border-t-[#3a3a3a] border-b border-b-[#0a0a0a]";

    if (device.type === 'Network') {
        // RJ45 ports with LEDs
        return (
            <div className={`w-full h-full flex flex-col justify-center px-2 gap-[2px] ${metalBg} transition-all`}>
                <div className="grid grid-cols-12 gap-[2px] min-w-0">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-full min-w-0 aspect-square max-h-[10px] bg-[#0f0f0f] border border-[#000] rounded-sm flex flex-col justify-between p-px shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                            <div className="flex justify-between">
                                <div className={`w-[2px] h-[2px] rounded-full ${isSelected && i % 2 === 0 ? 'bg-emerald-500 shadow-[0_0_2px_#10b981]' : 'bg-[#1a3a2a]'}`} />
                                <div className={`w-[2px] h-[2px] rounded-full ${isSelected && i % 3 === 0 ? 'bg-amber-500 shadow-[0_0_2px_#f59e0b]' : 'bg-[#3a2a1a]'}`} />
                            </div>
                            <div className="w-full h-[3px] bg-[#1a1a1a] rounded-sm" />
                        </div>
                    ))}
                </div>
                {device.sizeU > 1 && (
                    <div className="grid grid-cols-12 gap-[2px] mt-0.5 min-w-0">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-full min-w-0 aspect-square max-h-[10px] bg-[#0f0f0f] border border-[#000] rounded-sm flex flex-col justify-between p-px shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                                <div className="flex justify-between">
                                    <div className={`w-[2px] h-[2px] rounded-full ${isSelected && i % 2 !== 0 ? 'bg-emerald-500 shadow-[0_0_2px_#10b981]' : 'bg-[#1a3a2a]'}`} />
                                    <div className={`w-[2px] h-[2px] rounded-full bg-[#3a2a1a]`} />
                                </div>
                                <div className="w-full h-[3px] bg-[#1a1a1a] rounded-sm" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (device.type === 'Compute' || device.id === 'r730') {
        // Dell R730: 16x 2.5" Drive Bays based on reference image
        return (
            <div className={`w-full h-full flex items-center justify-center px-1 gap-[2px] ${metalBg} transition-all`}>
                {/* Left Ear - Control Panel & VGA */}
                <div className="w-[14px] h-[90%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex flex-col items-center justify-between py-1">
                    <div className="flex flex-col gap-[1px] items-center">
                        <div className={`w-[4px] h-[4px] rounded-full border border-[#000] ${isSelected ? 'bg-blue-500 shadow-[0_0_4px_#3b82f6]' : 'bg-[#0f172a]'}`} />
                        <div className="w-[6px] h-[2px] bg-[#333] rounded-[1px]" />
                    </div>
                    {/* Simulated VGA port */}
                    <div className="w-[8px] h-[4px] bg-blue-900/30 border border-[#000] rounded-[1px]" />
                </div>

                {/* 16x 2.5" Bay Array (2x8 grid) */}
                <div className="flex-1 h-[85%] grid grid-cols-8 grid-rows-2 gap-x-[2px] gap-y-[3px] bg-[#050505] p-[2px] rounded-sm shadow-[inset_0_2px_5px_rgba(0,0,0,1)]">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-full h-full bg-[#1e1e1e] border border-[#111] rounded-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between p-[1px]">
                            {/* Dell 2.5" Caddy Handle */}
                            <div className="w-[60%] h-[2px] bg-[#2a2a2a] rounded-[1px] ml-auto border-l border-[#000]" />
                            <div className="flex gap-[1px] justify-end">
                                <div className={`w-[1.5px] h-[1.5px] rounded-full ${isSelected ? 'bg-emerald-500 shadow-[0_0_2px_#10b981]' : 'bg-[#1a3a2a]'}`} />
                                <div className={`w-[1.5px] h-[1.5px] rounded-full ${isSelected && i % 4 === 0 ? 'bg-amber-500 shadow-[0_0_2px_#f59e0b]' : 'bg-[#333]'}`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Ear */}
                <div className="w-[14px] h-[90%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex flex-col items-center py-1">
                     <div className="w-[6px] h-[8px] border border-[#333] rounded-[1px] mt-auto" />
                </div>
            </div>
        );
    }

    if (device.type === 'Storage' || device.id === 'r730xd') {
        // Dell R730XD: 12x 3.5" Drive Bays based on reference image
        return (
            <div className={`w-full h-full flex items-center justify-center px-1 gap-[2px] ${metalBg} transition-all`}>
                {/* Left Ear */}
                <div className="w-[12px] h-[90%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex flex-col items-center py-1">
                    <div className={`w-[4px] h-[4px] rounded-full border border-[#000] ${isSelected ? 'bg-blue-500 shadow-[0_0_4px_#3b82f6]' : 'bg-[#0f172a]'}`} />
                    {/* Tiny service tag pull-out detail */}
                    <div className="w-[6px] h-[1px] bg-blue-500/50 mt-1" />
                </div>

                {/* 12x 3.5" Bay Array (3 rows of 4 columns) */}
                <div className="flex-1 h-[95%] grid grid-cols-4 grid-rows-3 gap-[2px] bg-[#000] p-[2px] rounded-sm shadow-[inset_0_2px_5px_rgba(0,0,0,1)]">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-full h-full bg-[#181818] border border-[#050505] rounded-[1px] flex justify-between p-[1px] relative overflow-hidden group/drive">
                            {/* Ventilation grille area */}
                            <div className="flex flex-col justify-between w-[40%] opacity-40">
                                <div className="w-full h-[1px] bg-[#000]" />
                                <div className="w-full h-[1px] bg-[#000]" />
                            </div>

                            {/* Latch handle mechanism */}
                            <div className="w-[40%] h-full bg-[#252525] border-l border-[#111] rounded-l-[1px] flex flex-col justify-between items-end p-[1px]">
                                {/* Dark red release button representation */}
                                <div className="w-[3px] h-[3px] bg-red-900/40 rounded-[1px]" />

                                <div className="flex gap-[1px]">
                                    <div className={`w-[1px] h-[1px] rounded-full ${isSelected ? 'bg-emerald-500 shadow-[0_0_2px_#10b981]' : 'bg-[#1a3a2a]'}`} />
                                    <div className={`w-[1px] h-[1px] rounded-full ${isSelected && i % 3 === 0 ? 'bg-amber-500 shadow-[0_0_3px_#f59e0b]' : 'bg-[#333]'}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Ear */}
                <div className="w-[12px] h-[90%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm" />
            </div>
        );
    }

    if (device.type === 'Passive') {
        // Patch Panels
        if (device.id.includes('patch')) {
            const portsPerU = 24;
            const rows = device.sizeU;
            return (
                <div className={`w-full h-full flex flex-col justify-center px-2 gap-[2px] ${metalBg} transition-all`}>
                    {[...Array(rows)].map((_, r) => (
                        <div key={r} className="grid grid-cols-4 gap-[2px] items-center w-full min-w-0">
                            {[...Array(4)].map((_, groupIdx) => (
                                <div key={groupIdx} className="grid grid-cols-6 gap-px min-w-0 bg-[#111] p-px border border-[#222] rounded-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                                    {[...Array(portsPerU / 4)].map((_, pIdx) => (
                                        <div key={pIdx} className="w-full min-w-0 aspect-square max-h-[8px] bg-[#050505] border border-[#000] rounded-sm flex items-end justify-center relative">
                                            {/* Keystone Jack details */}
                                            <div className="w-[4px] h-[3px] bg-[#1a1a1a] rounded-[1px] mb-[1px]" />
                                            {isSelected && (r + groupIdx + pIdx) % 3 === 0 && (
                                                <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-[#3a2a1a] rounded-full" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        }

        // Cable mgmt / bottom entry
        if (device.id.includes('cable-management')) {
            return (
                <div className={`w-full h-full flex items-center justify-center px-4 ${metalBg} opacity-80`}>
                    <div className="w-full h-[10px] flex justify-between gap-1">
                         {[...Array(20)].map((_, i) => (
                             <div key={i} className="flex-1 bg-[#0a0a0a] rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" />
                         ))}
                    </div>
                </div>
            );
        }

        // Blanking panel
        return (
            <div className={`w-full h-full flex items-center justify-between px-2 ${metalBg} opacity-90`}>
                <div className="w-[4px] h-[4px] rounded-full bg-[#050505] shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
                <div className="flex-1 mx-4 h-[2px] bg-[#111] rounded-full opacity-50" />
                <div className="w-[4px] h-[4px] rounded-full bg-[#050505] shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
            </div>
        );
    }

    if (device.type === 'Power') {
        // PDU with sockets and digital readout
        return (
            <div className={`w-full h-full flex items-center px-2 gap-2 justify-between ${metalBg} transition-all overflow-hidden`}>
                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Breaker Switch */}
                    <div className="w-[8px] h-[14px] bg-[#111] border border-[#000] rounded-sm flex items-center justify-center">
                        <div className="w-[6px] h-[6px] bg-red-600 rounded-[1px] shadow-[0_0_2px_rgba(220,38,38,0.5)]" />
                    </div>
                    {/* Digital Readout */}
                    <div className="bg-[#050505] border border-[#000] px-[2px] py-1 rounded-sm shadow-[inset_0_0_5px_rgba(0,0,0,1)] flex gap-[1px]">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-[1px]">
                                <div className="w-[4px] h-[3px] bg-red-500 shadow-[0_0_2px_rgba(239,68,68,0.8)] rounded-[1px]" />
                                <div className="w-[4px] h-[3px] bg-red-500 shadow-[0_0_2px_rgba(239,68,68,0.8)] rounded-[1px]" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Outlets */}
                <div className="grid grid-cols-8 gap-[2px] flex-1 min-w-0">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-full min-w-0 aspect-square max-h-[14px] bg-[#0a0a0a] border border-[#000] rounded-sm flex items-center justify-center relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
                            <div className="w-1/2 h-2/3 bg-[#000] rounded-[1px]" />
                            <div className="w-[2px] h-[2px] bg-[#111] rounded-full absolute bottom-[2px]" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (device.type === 'Console') {
        if (device.id === 'dell-monitor') {
            return (
                <div className={`w-full h-full flex items-center justify-center py-2 px-6 ${metalBg} transition-all`}>
                    <div className={`w-full max-w-[140px] h-full bg-[#050505] border-[4px] border-[#1a1a1a] rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex flex-col p-1 gap-[2px] overflow-hidden relative ${isSelected ? 'shadow-[0_0_15px_rgba(168,85,247,0.15)] border-[#2a2a2a]' : ''}`}>
                        {isSelected ? (
                            <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col p-[4px] gap-[3px]">
                                <div className="w-12 h-[2px] bg-green-500/70" />
                                <div className="w-8 h-[2px] bg-green-500/70" />
                                <div className="w-16 h-[2px] bg-green-500/70" />
                                <div className="w-4 h-[2px] bg-green-500/70" />
                                <div className="w-[2px] h-[2px] bg-green-400 absolute bottom-1 right-1 animate-pulse" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-[#050505]" />
                        )}
                        {/* Monitor logo/button */}
                        <div className="absolute bottom-[1px] left-1/2 -translate-x-1/2 w-2 h-[1px] bg-[#333]" />
                    </div>
                </div>
            );
        }
        if (device.id === 'keyboard-tray') {
            return (
                <div className={`w-full h-full flex items-end justify-center px-8 ${metalBg} pb-1 transition-all`}>
                    <div className="w-full max-w-[120px] h-[12px] bg-[#111] border border-[#222] rounded-sm flex gap-[1px] p-[1px]">
                        {[...Array(14)].map((_, i) => (
                            <div key={i} className="h-full flex-1 bg-[#2a2a2a] rounded-[1px] shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
                        ))}
                    </div>
                </div>
            );
        }
    }

    // Fallback
    return (
        <div className={`w-full h-full flex items-center justify-center ${metalBg}`}>
            <device.icon className={`w-3 h-3 text-[#555] transition-transform duration-300 ${isSelected ? 'scale-110 opacity-100' : 'opacity-40'}`} />
        </div>
    );
});

const RackDeviceButton = memo(function RackDeviceButton({
    device,
    isSelected,
    isHovered,
    onHover,
    onLeave,
    onSelect,
}) {
    const handleSelect = () => onSelect(device.id);
    const handleHitboxSelect = (e) => {
        e.stopPropagation();
        onSelect(device.id);
    };

    return (
        <motion.button
            onMouseEnter={() => onHover(device.id)}
            onMouseLeave={onLeave}
            onClick={handleSelect}
            data-interactable={!isSelected ? "true" : "false"}
            className={`relative transition-all duration-500 group/item [transform-style:preserve-3d] outline-none
                ${isSelected ? 'z-40 pointer-events-none' : isHovered ? 'z-30' : 'z-20'}
            `}
            style={{
                gridRow: `${43 - (device.startU + device.sizeU - 1)} / span ${device.sizeU}`,
                transform: isSelected ? 'translateZ(30px)' : isHovered ? 'translateZ(10px)' : 'translateZ(0px)'
            }}
        >
            {/* Actual Interaction Hitbox (Invisible, but blocks selected) */}
            <div
                className={`absolute -inset-y-4 -inset-x-2 z-50 pointer-events-auto ${isSelected ? 'hidden' : ''}`}
                onClick={handleHitboxSelect}
            />

            {/* Front Face */}
            <div className={`absolute inset-0 border transition-all duration-500 [transform:translateZ(0px)] overflow-hidden z-10
                ${isSelected
                    ? `border-[hsl(var(--foreground))]/60 shadow-[0_0_40px_rgba(255,255,255,0.1)]`
                    : 'border-[#1a1a1a] group-hover/item:border-[#444]'
                }
            `}>
                <HardwareVisual device={device} isSelected={isSelected || isHovered} />
            </div>

            {/* Top Face */}
            <div className={`absolute top-0 left-0 right-0 h-[40px] origin-top [transform:rotateX(-90deg)] border-x border-t transition-all duration-500 pointer-events-none bg-[#111] border-[#222] ${isHovered ? 'bg-[#1a1a1a]' : ''}`} />

            {/* Bottom Face */}
            <div className={`absolute bottom-0 left-0 right-0 h-[40px] origin-bottom [transform:rotateX(90deg)] border-x border-b transition-all duration-500 pointer-events-none bg-[#0a0a0a] border-[#222] ${isHovered ? 'bg-[#111]' : ''}`} />

            {/* Right Face */}
            <div className={`absolute top-0 bottom-0 right-0 w-[40px] origin-right [transform:rotateY(-90deg)] border-y border-r transition-all duration-500 pointer-events-none bg-[#151515] border-[#222] ${isHovered ? 'bg-[#202020]' : ''}`} />

            {/* Left Face */}
            <div className={`absolute top-0 bottom-0 left-0 w-[40px] origin-left [transform:rotateY(90deg)] border-y border-l transition-all duration-500 pointer-events-none bg-[#151515] border-[#222] ${isHovered ? 'bg-[#202020]' : ''}`} />

            {isSelected && (
                <motion.div
                    layoutId="scanner"
                    className="absolute -left-2 -right-2 h-[2px] bg-foreground/50 z-40 top-0 shadow-[0_0_15px_rgba(255,255,255,0.8)] [transform:translateZ(2px)] pointer-events-none"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            )}
        </motion.button>
    );
});

export default function RackModel() {
    const rackDevices = useMemo(() => [
        {
            id: 'cisco-isr4331',
            title: 'Cisco ISR4331 Router',
            shortLabel: 'Cisco ISR4331',
            startU: 42,
            sizeU: 1,
            icon: Route,
            type: 'Network',
            description: 'The rack edge router, handling WAN connectivity, routing policy, firewalling, VPN services, and traffic between the homelab and upstream networks.',
            details: ['1U integrated services router', '100 Mbps base performance, upgradeable to 300 Mbps', 'Modular NIM and service-module expansion'],
            electrical: ['Input: 100–240 V AC, 47–63 Hz', 'Typical draw: 42 W without modules', 'Maximum: 250 W with standard AC PSU; up to 530 W with PoE PSU'],
        },
        {
            id: 'patch-41',
            title: 'Patch Panel',
            shortLabel: 'U41 Patch Panel',
            startU: 41,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A passive termination point between the edge router and core switch that keeps permanent cabling fixed while short patch leads handle equipment changes.',
            details: ['U41 position', 'Passive structured-cabling termination', 'Router and core-switch patching'],
        },
        {
            id: 'cisco-catalyst-3850',
            title: 'Cisco Catalyst 3850',
            shortLabel: 'Catalyst 3850',
            startU: 40,
            sizeU: 1,
            icon: Network,
            type: 'Network',
            description: 'The primary managed switching platform for VLANs, inter-device connectivity, and access-layer services across the rack.',
            details: ['1U managed campus switch', 'StackWise and modular uplink support vary by model', 'PoE capacity depends on exact chassis and installed PSU'],
            electrical: ['Input: 100–240 V AC for 350/715 W PSUs; 115–240 V AC for 1,100 W PSU', 'Frequency: 50–60 Hz', 'Supported PSUs: 350 W, 715 W, 1,100 W AC, or 440 W DC depending on model'],
        },
        {
            id: 'patch-39',
            title: 'Patch Panel',
            shortLabel: 'U39 Patch Panel',
            startU: 39,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A dedicated passive cross-connect for organizing copper runs and presenting them cleanly to the adjacent switching equipment.',
            details: ['U39 position', 'Passive structured-cabling termination', 'Short patch-lead connection to active equipment'],
        },
        {
            id: 'patch-38',
            title: 'Patch Panel',
            shortLabel: 'U38 Patch Panel',
            startU: 38,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A second adjacent passive cross-connect that separates cable groups and reduces strain on the switch-facing patch leads.',
            details: ['U38 position', 'Passive structured-cabling termination', 'Cable-group separation and organization'],
        },
        {
            id: 'tp-link-sg3428',
            title: 'TP-Link SG3428',
            shortLabel: 'TP-Link SG3428',
            startU: 37,
            sizeU: 1,
            icon: Network,
            type: 'Network',
            description: 'A fanless managed access switch that adds copper ports and SFP uplinks for lab clients, appliances, and segmented test networks.',
            details: ['24 × Gigabit RJ45 ports', '4 × Gigabit SFP slots', '56 Gbps switching capacity'],
            electrical: ['Input: 100–240 V AC, 50/60 Hz', 'Maximum draw: approximately 20 W (hardware revision dependent)', 'Fanless internal power supply'],
        },
        {
            id: 'patch-36',
            title: 'Patch Panel',
            shortLabel: 'U36 Patch Panel',
            startU: 36,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'The lower network-section patch panel, providing a fixed termination point for connections served by the TP-Link switch.',
            details: ['U36 position', 'Passive structured-cabling termination', 'Access-switch patching'],
        },
        {
            id: 'apc-netbotz-570',
            title: 'APC NetBotz Rack Monitor 570',
            shortLabel: 'APC NetBotz 570',
            startU: 35,
            sizeU: 1,
            icon: Thermometer,
            type: 'Telemetry',
            description: 'The environmental and physical-security hub for collecting temperature, humidity, leak, door, camera, and auxiliary sensor data from the rack.',
            details: ['Supports external sensor and camera pods', 'Six universal sensor ports', 'Networked alerting and environmental telemetry'],
            electrical: ['Input: 100–240 V AC, 50/60 Hz', 'Maximum total current: 2 A', 'Sensor outputs: 12/24 V DC; A-Link 24 V output up to 1,000 mA'],
        },
        {
            id: 'cable-management-34',
            title: 'Cable Management Panel',
            shortLabel: 'U34 Cable Mgmt',
            startU: 34,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A horizontal routing channel that controls bend radius, strain, and patch-lead paths below the active network stack.',
            details: ['U34 position', 'Passive horizontal cable routing', 'Patch-lead strain relief and organization'],
        },
        {
            id: 'blank-30',
            title: 'Blank Panel',
            shortLabel: 'U30 Blank Panel',
            startU: 30,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A solid filler panel that closes an unused rack unit, improves front-to-back airflow discipline, and visually separates the network and console zones.',
            details: ['U30 position', 'Passive airflow management', 'Closes one unused rack unit'],
        },
        {
            id: 'dell-monitor',
            title: 'Dell Monitor',
            shortLabel: 'Dell Monitor',
            startU: 26,
            sizeU: 4,
            icon: Monitor,
            type: 'Console',
            description: 'A locally mounted Dell display for firmware setup, direct server administration, and troubleshooting when remote management is unavailable.',
            details: ['Spans U26–U29', 'Local VGA/display console', 'Exact panel model not specified'],
            electrical: ['Input voltage and frequency: model dependent', 'Power draw: model and brightness dependent', 'Confirm exact values from the monitor rear rating label'],
        },
        {
            id: 'blank-25',
            title: 'Blank Panel',
            shortLabel: 'U25 Blank Panel',
            startU: 25,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A solid filler panel below the display that blocks recirculating exhaust air and separates the display from the pull-out console hardware.',
            details: ['U25 position', 'Passive airflow management', 'Closes one unused rack unit'],
        },
        {
            id: 'tray-24',
            title: 'Tray',
            shortLabel: 'U24 Tray',
            startU: 24,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A fixed rack shelf for supporting non-rackmount console accessories or small devices immediately above the input tray.',
            details: ['U24 position', 'Passive equipment support', 'Load rating depends on the installed tray'],
        },
        {
            id: 'keyboard-tray',
            title: 'Keyboard & Mouse Tray',
            shortLabel: 'Keyboard & Mouse',
            startU: 23,
            sizeU: 1,
            icon: Keyboard,
            type: 'Console',
            description: 'A sliding keyboard and mouse platform that provides direct local input while stowing inside the rack when it is not in use.',
            details: ['U23 position', 'Passive sliding console platform', 'Local keyboard and pointing-device support'],
        },
        {
            id: 'r730',
            title: 'Dell PowerEdge R730',
            shortLabel: 'Dell R730',
            startU: 21,
            sizeU: 2,
            icon: Server,
            type: 'Compute',
            description: 'A 2U general-purpose compute node for virtual machines, containers, infrastructure services, and other processor- or memory-focused lab workloads.',
            details: ['2U dual-socket server', 'Up to two hot-swappable PSUs with 1+1 redundancy', 'Compute-focused virtualization and service workloads'],
            electrical: ['AC input: normally 100–240 V, 50/60 Hz (200–240 V for 750 W Titanium PSU)', 'Supported PSU ratings: 495 W, 750 W, or 1,100 W', 'Actual draw depends on CPU, memory, storage, and accelerator configuration'],
        },
        {
            id: 'r730xd',
            title: 'Dell PowerEdge R730XD',
            shortLabel: 'Dell R730XD',
            startU: 19,
            sizeU: 2,
            icon: HardDrive,
            type: 'Storage',
            description: 'A storage-dense 2U server for bulk disks, lab datasets, virtual-machine storage, backups, and workloads that benefit from the R730XD drive layout.',
            details: ['2U storage-dense server', 'Up to two hot-swappable PSUs with 1+1 redundancy', 'Storage-focused virtualization and data workloads'],
            electrical: ['AC input: normally 100–240 V, 50/60 Hz (200–240 V for 750 W Titanium PSU)', 'Supported PSU ratings: 495 W, 750 W, or 1,100 W', 'Actual draw depends on CPU, memory, drive count, and accelerator configuration'],
        },
        {
            id: 'blank-10',
            title: 'Blank Panel',
            shortLabel: 'U10 Blank Panel',
            startU: 10,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A filler panel closing the lower boundary of the large expansion zone and limiting exhaust-air recirculation through unused rack space.',
            details: ['U10 position', 'Passive airflow management', 'Closes one unused rack unit'],
        },
        {
            id: 'blank-9',
            title: 'Blank Panel',
            shortLabel: 'U9 Blank Panel',
            startU: 9,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A filler panel that closes the final open unit before the power-distribution stack and keeps the lower rack layout visually and thermally separated.',
            details: ['U9 position', 'Passive airflow management', 'Closes one unused rack unit'],
        },
        {
            id: 'apc-ap7921b',
            title: 'APC AP7921B',
            shortLabel: 'APC AP7921B',
            startU: 8,
            sizeU: 1,
            icon: PlugZap,
            type: 'Power',
            description: 'A network-managed switched PDU that distributes rack power through individually controllable outlets for remote restart and load management.',
            details: ['1U single-phase switched PDU', '8 × IEC C13 outlets', 'Remote outlet switching and current metering'],
            electrical: ['Input/output: 208/230 V AC, 50/60 Hz', 'Rated current: 16 A', 'Load capacity: 3.3 kW at 208 V or 3.7 kW at 230 V'],
        },
        {
            id: 'cable-management-7',
            title: 'Cable Management Panel',
            shortLabel: 'U7 Cable Mgmt',
            startU: 7,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A horizontal organizer that routes power leads cleanly between the two switched PDUs while providing bend and strain control.',
            details: ['U7 position', 'Passive horizontal cable routing', 'Power-lead separation and strain relief'],
        },
        {
            id: 'apc-ap7921',
            title: 'APC AP7921',
            shortLabel: 'APC AP7921',
            startU: 6,
            sizeU: 1,
            icon: PlugZap,
            type: 'Power',
            description: 'A switched rack PDU for remotely controlling eight outlets, monitoring the branch load, and recovering attached equipment without physical access.',
            details: ['1U single-phase switched PDU', '8 × IEC C13 outlets', 'Remote outlet switching and load monitoring'],
            electrical: ['Input/output: 208/230 V AC, 50/60 Hz', 'Rated current: 16 A', 'Load capacity: 3.3 kW at 208 V or 3.7 kW at 230 V'],
        },
        {
            id: 'cable-management-5',
            title: 'Cable Management Panel',
            shortLabel: 'U5 Cable Mgmt',
            startU: 5,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'A horizontal organizer that separates the switched-PDU feeds from the ATS connections and keeps service loops contained.',
            details: ['U5 position', 'Passive horizontal cable routing', 'Power-lead separation and strain relief'],
        },
        {
            id: 'apc-ap4423-ats',
            title: 'APC AP4423 ATS',
            shortLabel: 'APC AP4423 ATS',
            startU: 4,
            sizeU: 1,
            icon: PlugZap,
            type: 'Power',
            description: 'A rack automatic transfer switch that supplies single-corded equipment from one of two independent sources and transfers when the preferred source fails.',
            details: ['1U automatic transfer switch', '2 × IEC C20 inputs', '8 × IEC C13 and 1 × IEC C19 outputs'],
            electrical: ['Rated input/output: 230 V AC, 50/60 Hz', 'Rated current: 16 A; 20 A maximum line current', 'Load capacity: 3,700 VA'],
        },
        {
            id: 'cable-management-3',
            title: 'Cable Management Panel',
            shortLabel: 'U3 Cable Mgmt',
            startU: 3,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'The lowest horizontal organizer, guiding incoming and outgoing power leads between the ATS and bottom equipment shelf.',
            details: ['U3 position', 'Passive horizontal cable routing', 'Bottom-section cable strain relief'],
        },
        {
            id: 'tray-2',
            title: 'Tray',
            shortLabel: 'U2 Tray',
            startU: 2,
            sizeU: 1,
            icon: Server,
            type: 'Passive',
            description: 'A low-mounted fixed shelf for non-rackmount power accessories or other compact equipment, leaving U1 unobstructed beneath it.',
            details: ['U2 position', 'Passive equipment support', 'Load rating depends on the installed tray'],
        },
    ], []);

    const [selectedId, setSelectedId] = useState('r730');
    const [isHovering, setIsHovering] = useState(null);
    const handleHover = useCallback((id) => setIsHovering(id), []);
    const handleLeave = useCallback(() => setIsHovering(null), []);
    const handleSelect = useCallback((id) => setSelectedId(id), []);

    const activeItem = useMemo(() => {
        return rackDevices.find(d => d.id === selectedId) || rackDevices[0];
    }, [rackDevices, selectedId]);

    const getTypeColor = (type) => {
        switch (type) {
            case 'Compute': return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
            case 'Storage': return 'text-amber-400 border-amber-400/30 bg-amber-400/5';
            case 'Network': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5';
            case 'Power': return 'text-red-400 border-red-400/30 bg-red-400/5';
            case 'Console': return 'text-purple-400 border-purple-400/30 bg-purple-400/5';
            case 'Telemetry': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5';
            default: return 'text-muted-foreground border-border bg-muted/5';
        }
    };

    return (
        <FadeIn className="mt-32 w-full">
            <div className="flex flex-col gap-12 items-start w-full">
                {/* Header Section */}
                <div className="w-full max-w-3xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-foreground/50" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Infrastructure Node</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4">42U Home Lab.</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                        Self-contained rack-scale infrastructure for compute, storage, and networking experimentation.
                    </p>
                </div>

                {/* Main Interactive Area */}
                <div className="grid grid-cols-1 lg:grid-cols-[150px_280px_minmax(0,1fr)] xl:grid-cols-[minmax(160px,200px)_minmax(280px,320px)_minmax(0,1fr)] gap-6 lg:gap-4 xl:gap-8 w-full min-w-0 items-start">
                    {/* Navigation Sidebar (Content Level) */}
                    <div className="order-3 lg:order-1 min-w-0 w-full lg:h-[682px] flex flex-col">
                        <span className="block shrink-0 text-[10px] font-mono text-muted-foreground uppercase mb-4 tracking-widest opacity-50">Select Device</span>
                        <div className="flex flex-wrap lg:flex-nowrap lg:flex-col gap-2 max-h-[60vh] sm:max-h-[520px] lg:max-h-none lg:flex-1 lg:min-h-0 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]">
                            {rackDevices.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    className={`text-left px-3 py-2 text-[10px] font-mono uppercase transition-all border min-w-0 w-[calc(50%_-_0.25rem)] sm:w-auto lg:w-full lg:shrink-0 break-words
                                        ${selectedId === item.id
                                            ? 'bg-foreground text-background border-foreground'
                                            : 'bg-muted/5 text-muted-foreground border-border/50 hover:border-border hover:text-foreground'
                                        }
                                    `}
                                >
                                    {item.shortLabel}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The Rack Schematic */}
                    <div className="order-1 lg:order-2 relative group [perspective:1200px] min-w-0 w-full max-w-[320px] justify-self-center">
                        <div className="absolute -inset-8 bg-gradient-to-b from-foreground/5 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 p-3 sm:p-4 transition-all duration-700 xl:[transform:rotateY(-10deg)] xl:hover:[transform:rotateY(-3deg)] [transform-style:preserve-3d]">
                            {/* 3D Backplate */}
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border border-border shadow-2xl [transform:translateZ(-40px)]" />

                            {/* 3D Rack Frame */}
                            <div className="absolute inset-3 sm:inset-4 pointer-events-none border-[8px] sm:border-[12px] border-muted/30 [transform:translateZ(-10px)]" />

                            <div className="relative grid grid-cols-[28px_minmax(0,1fr)] sm:grid-cols-[32px_minmax(0,1fr)] gap-2 sm:gap-4 h-[560px] sm:h-[650px] [transform-style:preserve-3d] min-w-0">
                                {/* Unit Ticks */}
                                <div className="flex flex-col justify-between py-2 border-r border-border/50 text-[9px] font-mono text-muted-foreground/50 [transform:translateZ(0px)]">
                                    {[42, 35, 28, 21, 14, 7, 1].map(u => (
                                        <div key={u} className="flex items-center gap-2">
                                            <span>{u.toString().padStart(2, '0')}</span>
                                            <div className="w-2 h-[1px] bg-border" />
                                        </div>
                                    ))}
                                </div>

                                {/* Device Stack */}
                                <div className="relative grid grid-rows-[repeat(42,1fr)] gap-[2px] [transform-style:preserve-3d] pt-1 min-w-0">
                                    {rackDevices.map((device) => (
                                        <RackDeviceButton
                                            key={device.id}
                                            device={device}
                                            isSelected={selectedId === device.id}
                                            isHovered={isHovering === device.id}
                                            onHover={handleHover}
                                            onLeave={handleLeave}
                                            onSelect={handleSelect}
                                        />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HUD Detail Panel */}
                    <div className="order-2 lg:order-3 relative flex flex-col min-h-[400px] lg:h-[682px] min-w-0 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-none lg:flex-1 lg:min-h-0 flex flex-col p-4 sm:p-6 xl:p-8 border border-border bg-muted/5 backdrop-blur-sm relative overflow-x-hidden overflow-y-visible lg:overflow-y-auto lg:overscroll-contain min-w-0 [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-border/50" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-border/50" />

                                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8 min-w-0">
                                    <div className={`p-2.5 sm:p-3 border shrink-0 ${getTypeColor(activeItem.type)}`}>
                                        <activeItem.icon className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{activeItem.type}</span>
                                            {activeItem.startU && (
                                                <span className="text-[10px] font-mono text-foreground/50 border border-border px-1.5 py-0.5">
                                                    U{activeItem.startU}{activeItem.sizeU > 1 ? `-U${activeItem.startU + activeItem.sizeU - 1}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-lg sm:text-xl font-bold tracking-tight mt-1 break-words">{activeItem.title}</h4>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                                    {activeItem.description}
                                </p>

                                <div className="space-y-4">
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] block mb-2">Item Details</span>
                                    <div className="grid gap-3">
                                        {activeItem.details.map((detail, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3 p-3 border border-border bg-background/50 group hover:border-foreground/30 transition-colors min-w-0"
                                            >
                                                <div className="w-1 h-1 mt-1 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors shrink-0" />
                                                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors min-w-0 break-words">{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {activeItem.electrical && (
                                    <div className="space-y-4 mt-8">
                                        <span className="text-[10px] font-mono text-red-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                                            <Zap className="w-3 h-3" />
                                            Electrical Specifications
                                        </span>
                                        <div className="grid gap-3">
                                            {activeItem.electrical.map((spec, i) => (
                                                <motion.div
                                                    key={spec}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: (activeItem.details.length + i) * 0.1 }}
                                                    className="flex items-start gap-3 p-3 border border-red-400/20 bg-red-400/[0.03] group hover:border-red-400/40 transition-colors min-w-0"
                                                >
                                                    <div className="w-1 h-1 mt-1 rounded-full bg-red-400/50 group-hover:bg-red-400 transition-colors shrink-0" />
                                                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors min-w-0 break-words">{spec}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto pt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border/50">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">Rack Height</span>
                                            <span className="text-xs font-bold">{activeItem.sizeU}U</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">Power Profile</span>
                                            <span className="text-xs font-bold">{activeItem.electrical ? 'Powered' : 'Passive'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-30">
                                        <Shield className="w-3 h-3" />
                                        <Cpu className="w-3 h-3" />
                                        <Zap className="w-3 h-3" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
