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
            <div className={`w-full h-full flex flex-col justify-center px-3 gap-[3px] ${metalBg} transition-all`}>
                <div className="flex justify-end gap-[3px]">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-[10px] h-[10px] bg-[#0f0f0f] border border-[#000] rounded-sm flex flex-col justify-between p-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                            <div className="flex justify-between">
                                <div className={`w-[2px] h-[2px] rounded-full ${isSelected && i % 2 === 0 ? 'bg-emerald-500 shadow-[0_0_2px_#10b981]' : 'bg-[#1a3a2a]'}`} />
                                <div className={`w-[2px] h-[2px] rounded-full ${isSelected && i % 3 === 0 ? 'bg-amber-500 shadow-[0_0_2px_#f59e0b]' : 'bg-[#3a2a1a]'}`} />
                            </div>
                            <div className="w-full h-[3px] bg-[#1a1a1a] rounded-sm" />
                        </div>
                    ))}
                </div>
                {device.sizeU > 1 && (
                    <div className="flex justify-end gap-[3px] mt-1">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-[10px] h-[10px] bg-[#0f0f0f] border border-[#000] rounded-sm flex flex-col justify-between p-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
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
                <div className={`w-full h-full flex flex-col justify-center px-4 gap-[2px] ${metalBg} transition-all`}>
                    {[...Array(rows)].map((_, r) => (
                        <div key={r} className="flex justify-between items-center w-full">
                            {[...Array(4)].map((_, groupIdx) => (
                                <div key={groupIdx} className="flex gap-[2px] bg-[#111] p-[2px] border border-[#222] rounded-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                                    {[...Array(portsPerU / 4)].map((_, pIdx) => (
                                        <div key={pIdx} className="w-[8px] h-[8px] bg-[#050505] border border-[#000] rounded-sm flex items-end justify-center relative">
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
        if (device.id === 'cabling' || device.id === 'bottom-cable-entry') {
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
            <div className={`w-full h-full flex items-center px-3 justify-between ${metalBg} transition-all`}>
                <div className="flex items-center gap-3">
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
                <div className="flex gap-[4px]">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-[14px] h-[14px] bg-[#0a0a0a] border border-[#000] rounded-sm flex items-center justify-center relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
                            <div className="w-[6px] h-[8px] bg-[#000] rounded-[1px]" />
                            <div className="w-[2px] h-[2px] bg-[#111] rounded-full absolute bottom-[2px]" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (device.type === 'Console') {
        if (device.id === 'monitor') {
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
            id: 'patch-1u-top',
            title: '1U 24-port Patch Panel',
            shortLabel: '1U Patch',
            startU: 42,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'Top 24-port patch panel for incoming uplinks and structured cabling.',
            details: ['24 ports', 'Incoming uplinks', 'Structured cabling'],
        },
        {
            id: 'router-1u',
            title: '1U Edge Router',
            shortLabel: '1U Router',
            startU: 41,
            sizeU: 1,
            icon: Route,
            type: 'Network',
            description: 'Edge routing, firewall, and NAT services.',
            details: ['Edge routing', 'Firewall services', 'NAT translation'],
        },
        {
            id: 'patch-2u',
            title: '2U 48-port Patch Panel',
            shortLabel: '2U Patch',
            startU: 39,
            sizeU: 2,
            icon: Cable,
            type: 'Passive',
            description: 'High-density 48-port patch panel for core switching fabric.',
            details: ['48 ports', 'High density', 'Core fabric patching'],
        },
        {
            id: 'switch-1u',
            title: '1U Core Switch',
            shortLabel: '1U Switch',
            startU: 38,
            sizeU: 1,
            icon: Network,
            type: 'Network',
            description: 'Top-of-rack switching fabric for server access and internal traffic.',
            details: ['Top-of-rack switching', 'Server access ports', 'Internal traffic'],
        },
        {
            id: 'patch-1u-mid',
            title: '1U 24-port Patch Panel',
            shortLabel: '1U Patch',
            startU: 37,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: 'Additional 24-port patch panel for appliance access.',
            details: ['24 ports', 'Appliance patching', 'Cable management'],
        },
        {
            id: 'monitor',
            title: 'Rack Monitor',
            shortLabel: 'Monitor',
            startU: 33,
            sizeU: 4,
            icon: Monitor,
            type: 'Console',
            description: 'Rack-mounted monitor for local console access and quick checks.',
            details: ['Local console display', 'Rack-side troubleshooting', 'Current setup'],
        },
        {
            id: 'keyboard-tray',
            title: 'Keyboard Tray',
            shortLabel: 'Keyboard tray',
            startU: 32,
            sizeU: 1,
            icon: Keyboard,
            type: 'Console',
            description: 'Sliding keyboard tray for local interaction with rack systems.',
            details: ['Local input', 'Console access', 'Slides into the rack'],
        },
        {
            id: 'r730',
            title: 'Dell PowerEdge R730',
            shortLabel: 'Dell R730',
            startU: 24,
            sizeU: 2,
            icon: Server,
            type: 'Compute',
            description: 'One of the first servers that started the rack build.',
            details: ['Started the home lab', 'Compute-focused node', 'KVM and service workloads'],
        },
        {
            id: 'r730xd',
            title: 'Dell PowerEdge R730XD',
            shortLabel: 'Dell R730XD',
            startU: 21,
            sizeU: 2,
            icon: HardDrive,
            type: 'Storage',
            description: 'Storage-heavy Dell node used as part of the rack-scale lab foundation.',
            details: ['Started the home lab', 'Storage-focused node', 'Bulk disks and lab data'],
        },
        {
            id: 'shelf',
            title: '4U rack shelf',
            shortLabel: 'Shelf',
            startU: 17,
            sizeU: 4,
            icon: Server,
            type: 'Passive',
            description: 'A 4U rack shelf mounted below the server area for supporting smaller equipment or console hardware.',
            details: ['Below the servers', '4U shelf space', 'Part of current rack layout'],
        },
        {
            id: 'power',
            title: 'Power distribution',
            shortLabel: 'PDUs / power',
            startU: 3,
            sizeU: 2,
            icon: PlugZap,
            type: 'Power',
            description: '2U power distribution from U3 to U4 for the current rack setup.',
            details: ['Rack PDUs', 'U3-U4 position', 'Power delivery for rack equipment'],
        },
        {
            id: 'bottom-cable-entry',
            title: 'Bottom cable entry',
            shortLabel: 'Cable entry',
            startU: 1,
            sizeU: 1,
            icon: Cable,
            type: 'Passive',
            description: '1U bottom space for power, fiber, and Ethernet cables entering the rack.',
            details: ['Power cable entry', 'Fiber cable entry', 'Ethernet cable entry'],
        },
    ], []);

    const rackSensorGroup = useMemo(() => ({
        id: 'sensors',
        title: 'Environmental Sensors',
        shortLabel: 'Sensors',
        type: 'Telemetry',
        icon: Thermometer,
        description: 'Environmental and power telemetry sensors mounted separately from the rack power distribution hardware.',
        details: ['4 wall-mounted temperature sensors', '1 center humidity sensor', 'Power / current sensor in front of PDU'],
    }), []);

    const rackSensorMarkers = useMemo(() => [
        { id: 'temp-1', label: 'Temp 1', top: '43%', left: '37%' },
        { id: 'temp-2', label: 'Temp 2', top: '43%', left: '63%' },
        { id: 'hum-1', label: 'Humidity', top: '52%', left: '50%' },
        { id: 'temp-3', label: 'Temp 3', top: '61%', left: '37%' },
        { id: 'temp-4', label: 'Temp 4', top: '61%', left: '63%' },
        { id: 'pwr-1', label: 'Power', top: '91.5%', left: '72%' },
    ], []);

    const [selectedId, setSelectedId] = useState('r730');
    const [isHovering, setIsHovering] = useState(null);
    const rackNavigationItems = useMemo(() => rackDevices.concat(rackSensorGroup), [rackDevices, rackSensorGroup]);
    const handleHover = useCallback((id) => setIsHovering(id), []);
    const handleLeave = useCallback(() => setIsHovering(null), []);
    const handleSelect = useCallback((id) => setSelectedId(id), []);

    const activeItem = useMemo(() => {
        if (selectedId === 'sensors') return rackSensorGroup;
        return rackDevices.find(d => d.id === selectedId) || rackDevices[0];
    }, [rackDevices, rackSensorGroup, selectedId]);

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
                <div className="grid md:grid-cols-1 xl:grid-cols-[180px_240px_1fr] gap-8 w-full">
                    {/* Navigation Sidebar (Content Level) */}
                    <div className="space-y-1 md:order-last xl:order-first">
                        <span className="block text-[10px] font-mono text-muted-foreground uppercase mb-4 tracking-widest opacity-50">Select Device</span>
                        <div className="flex flex-wrap xl:flex-col gap-2">
                            {rackNavigationItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    className={`text-left px-3 py-2 text-[10px] font-mono uppercase transition-all border w-full sm:w-auto xl:w-full
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
                    <div className="relative group [perspective:1200px] mt-8 xl:mt-0">
                        <div className="absolute -inset-8 bg-gradient-to-b from-foreground/5 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 p-4 transition-all duration-700 lg:[transform:rotateY(-12deg)] lg:hover:[transform:rotateY(-4deg)] [transform-style:preserve-3d]">
                            {/* 3D Backplate */}
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border border-border shadow-2xl [transform:translateZ(-40px)]" />

                            {/* 3D Rack Frame */}
                            <div className="absolute inset-4 pointer-events-none border-[12px] border-muted/30 [transform:translateZ(-10px)]" />

                            <div className="relative grid grid-cols-[32px_1fr] gap-4 h-[500px] sm:h-[650px] [transform-style:preserve-3d]">
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
                                <div className="relative grid grid-rows-[repeat(42,1fr)] gap-[2px] [transform-style:preserve-3d] pt-1">
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

                                    {/* Sensor Overlays with expanded hit areas */}
                                    {rackSensorMarkers.map(sensor => (
                                        <button
                                            key={sensor.id}
                                            onClick={() => handleSelect('sensors')}
                                            onMouseEnter={() => handleHover('sensors')}
                                            onMouseLeave={handleLeave}
                                            data-interactable="true"
                                            className={`absolute z-50 group/sensor transition-all duration-300
                                                ${selectedId === 'sensors' ? '[transform:translateZ(40px)]' : '[transform:translateZ(15px)]'}
                                            `}
                                            style={{ top: sensor.top, left: sensor.left }}
                                        >
                                            {/* Invisible hit area (24px) */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-transparent" />

                                            {/* Visual Marker */}
                                            <div className={`w-2 h-2 rounded-full border border-cyan-400/50 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover/sensor:scale-150
                                                ${selectedId === 'sensors' ? 'scale-125' : 'opacity-50 group-hover/sensor:opacity-100'}
                                            `} />

                                            {/* Minimal label on hover */}
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/sensor:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm border border-cyan-500/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-400 whitespace-nowrap pointer-events-none">
                                                {sensor.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HUD Detail Panel */}
                    <div className="relative flex flex-col h-full min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 flex flex-col p-8 border border-border bg-muted/5 backdrop-blur-sm relative overflow-hidden"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-border/50" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-border/50" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`p-3 border ${getTypeColor(activeItem.type)}`}>
                                        <activeItem.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{activeItem.type}</span>
                                            {activeItem.startU && (
                                                <span className="text-[10px] font-mono text-foreground/50 border border-border px-1.5 py-0.5">
                                                    U{activeItem.startU}{activeItem.sizeU > 1 ? `-U${activeItem.startU + activeItem.sizeU - 1}` : ''}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-bold tracking-tight mt-1">{activeItem.title}</h4>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-12">
                                    {activeItem.description}
                                </p>

                                <div className="space-y-4">
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] block mb-2">Technical Specs</span>
                                    <div className="grid gap-3">
                                        {activeItem.details.map((detail, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-3 p-3 border border-border bg-background/50 group hover:border-foreground/30 transition-colors"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors" />
                                                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 flex items-center justify-between border-t border-border/50">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">Power Load</span>
                                            <span className="text-xs font-bold">-- W</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">Thermal</span>
                                            <span className="text-xs font-bold">-- °C</span>
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
