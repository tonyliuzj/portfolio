import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Activity, Compass, Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown, ChevronUp, Globe, ShieldCheck, Network, Server, Route, HardDrive, Cable, PlugZap, Monitor, Keyboard, Gauge, Thermometer, Droplets } from "lucide-react"

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });
const defaultDomains = [
    { label: 'Tony-Liu.com', url: 'https://tony-liu.com', type: 'domain' }
];
const aliasWindowSize = 3;
const domainTypeOrder = ['domain', 'redirect', 'alias'];
const domainTypeConfig = {
    domain: {
        label: 'Primary',
        title: 'Primary Domain',
        description: 'Canonical home for the portfolio.',
        badgeClass: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200',
    },
    redirect: {
        label: 'Redirect',
        title: 'Redirects',
        description: 'Domains that forward visitors to the main site.',
        badgeClass: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    },
    alias: {
        label: 'Alias',
        title: 'Aliases',
        description: 'Extra hostnames that resolve to the portfolio.',
        badgeClass: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
    },
};

const normalizeDomainType = (type, index = 0) => {
    if (domainTypeOrder.includes(type)) return type;
    return index === 0 ? 'domain' : 'alias';
};

const stripTrailingCommas = (input) => {
    let output = '';
    let inString = false;
    let isEscaped = false;

    for (let index = 0; index < input.length; index += 1) {
        const char = input[index];

        if (isEscaped) {
            output += char;
            isEscaped = false;
            continue;
        }

        if (inString && char === '\\') {
            output += char;
            isEscaped = true;
            continue;
        }

        if (char === '"') {
            inString = !inString;
            output += char;
            continue;
        }

        if (!inString && char === ',') {
            let nextIndex = index + 1;

            while (nextIndex < input.length && /\s/.test(input[nextIndex])) {
                nextIndex += 1;
            }

            if (input[nextIndex] === ']' || input[nextIndex] === '}') {
                continue;
            }
        }

        output += char;
    }

    return output;
};

const parsePortfolioData = (text) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        const sanitizedText = stripTrailingCommas(text);

        if (sanitizedText === text) {
            throw error;
        }

        try {
            console.warn('Recovered malformed portfolio data by removing trailing commas.');
            return JSON.parse(sanitizedText);
        } catch {
            throw error;
        }
    }
};

const parsePortfolioItems = (items) => {
    if (!Array.isArray(items)) return [];

    return items
        .filter((item) =>
            typeof item?.title === 'string' &&
            typeof item?.description === 'string' &&
            typeof item?.url === 'string'
        )
        .map((item, index) => ({
            id: item.id ?? `${item.title}-${index}`,
            ...item,
            badges: Array.isArray(item.badges)
                ? item.badges.filter((badge) =>
                    typeof badge?.text === 'string' && typeof badge?.color === 'string'
                )
                : [],
        }));
};

const parseDomains = (domains) => {
    if (!Array.isArray(domains)) return defaultDomains;

    const validDomains = domains
        .filter((domain) =>
            typeof domain?.label === 'string' && typeof domain?.url === 'string'
        )
        .map((domain, index) => ({
            ...domain,
            type: normalizeDomainType(domain.type, index),
        }));

    return validDomains.length > 0 ? validDomains : defaultDomains;
};

// Interactive Iframe Component - Prevents scroll trap on mobile
function InteractiveIframe({ src, title }) {
    const [isInteracting, setIsInteracting] = useState(false);

    return (
        <div
            className="relative w-full h-[60vh] md:h-[80vh] bg-black/20"
            onMouseLeave={() => setIsInteracting(false)}
        >
            <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 cursor-pointer
                ${isInteracting ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black/30'}`}
                onClick={() => setIsInteracting(true)}
            >
                <Button variant="secondary" size="sm" className="pointer-events-none">
                    Click to Interact
                </Button>
            </div>

            <iframe
                src={src}
                className={`w-full h-full border-0 transition-all duration-500 ${isInteracting ? 'pointer-events-auto' : 'pointer-events-none opacity-40'}`}
                title={title}
                sandbox="allow-forms allow-same-origin allow-scripts"
            />
        </div>
    );
}

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="mb-8 max-w-2xl">
            {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    {eyebrow}
                </p>
            )}
            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h3>
            {description && (
                <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}

function BrowserFrame({ id, url, title, src, footerHref, footerLabel, externalLinkProps }) {
    return (
        <div id={id} className="scroll-mt-24">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 ml-4 bg-black/20 rounded-md px-3 py-1 text-xs text-slate-500 font-mono text-center truncate">
                        {url}
                    </div>
                </div>
                <CardContent className="p-0">
                    <InteractiveIframe src={src} title={title} />
                </CardContent>
                <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                    <p className="text-xs text-slate-500">
                        Powered by <a {...externalLinkProps} href={footerHref} className="text-indigo-400 hover:text-indigo-300 transition-colors">{footerLabel}</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

function RackModel() {
    const rackDevices = [
        {
            id: 'tor',
            title: 'Top-of-rack switches',
            shortLabel: 'TOR switches',
            startU: 41,
            sizeU: 2,
            icon: Network,
            className: 'border-cyan-400/30 bg-cyan-400/15 text-cyan-100',
            description: 'Switching fabric for server access, internal traffic, and rack uplinks.',
            details: ['Top-of-rack switching', 'Server access ports', 'Network aggregation point'],
        },
        {
            id: 'blank-below-switches',
            title: '1U blanking panel below switches',
            shortLabel: 'Blanking panel',
            startU: 40,
            sizeU: 1,
            icon: Server,
            className: 'border-white/10 bg-white/[0.06] text-slate-300',
            description: 'A 1U blanking panel directly below the top-of-rack switches.',
            details: ['Below switches', '1U spacing', 'Airflow control'],
        },
        {
            id: 'cabling',
            title: 'Patch and cable management',
            shortLabel: 'Patch / cable',
            startU: 38,
            sizeU: 2,
            icon: Cable,
            className: 'border-slate-300/20 bg-slate-300/10 text-slate-200',
            description: 'Structured cabling paths for keeping compute, storage, and appliances serviceable.',
            details: ['Patch management', 'Front-to-back cable paths', 'Serviceable rack layout'],
        },
        {
            id: 'blank-network-upper',
            title: '1U blanking panel',
            shortLabel: 'Blanking panel',
            startU: 37,
            sizeU: 1,
            icon: Server,
            className: 'border-white/10 bg-white/[0.06] text-slate-300',
            description: 'A 1U blanking panel between network devices for spacing and airflow management.',
            details: ['1U spacing', 'Airflow control', 'Cleaner rack layout'],
        },
        {
            id: 'network-appliances',
            title: 'Network appliances',
            shortLabel: 'Network appliances',
            startU: 34,
            sizeU: 3,
            icon: Route,
            className: 'border-indigo-400/30 bg-indigo-400/15 text-indigo-100',
            description: 'Routing, firewall, NAT, and overlay networking experiments live here.',
            details: ['Routing and NAT concepts', 'Overlay networking tests', 'Firewall and edge services'],
        },
        {
            id: 'blank-network-lower',
            title: '1U blanking panel',
            shortLabel: 'Blanking panel',
            startU: 33,
            sizeU: 1,
            icon: Server,
            className: 'border-white/10 bg-white/[0.06] text-slate-300',
            description: 'A 1U blanking panel between network devices for spacing and airflow management.',
            details: ['1U spacing', 'Airflow control', 'Cleaner rack layout'],
        },
        {
            id: 'monitor',
            title: 'Rack monitor',
            shortLabel: 'Monitor',
            startU: 29,
            sizeU: 4,
            icon: Monitor,
            className: 'border-violet-400/30 bg-violet-400/15 text-violet-100',
            description: 'Rack-mounted monitor for local console access and quick checks.',
            details: ['Local console display', 'Rack-side troubleshooting', 'Current setup'],
        },
        {
            id: 'keyboard-tray',
            title: 'Keyboard tray',
            shortLabel: 'Keyboard tray',
            startU: 28,
            sizeU: 1,
            icon: Keyboard,
            className: 'border-fuchsia-400/30 bg-fuchsia-400/15 text-fuchsia-100',
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
            className: 'border-white/30 bg-white/15 text-white',
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
            className: 'border-amber-400/30 bg-amber-400/15 text-amber-100',
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
            className: 'border-lime-400/30 bg-lime-400/15 text-lime-100',
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
            className: 'border-rose-400/30 bg-rose-400/15 text-rose-100',
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
            className: 'border-sky-400/30 bg-sky-400/15 text-sky-100',
            description: '1U bottom space for power, fiber, and Ethernet cables entering the rack.',
            details: ['Power cable entry', 'Fiber cable entry', 'Ethernet cable entry'],
        },
    ];
    const rackSensorGroup = {
        id: 'sensors',
        title: 'Rack sensors',
        locationLabel: 'Wall and front-mounted',
        icon: Thermometer,
        className: 'border-orange-300/40 bg-orange-300/15 text-orange-100',
        description: 'Environmental and power telemetry sensors mounted separately from the rack power distribution hardware.',
        details: ['4 wall-mounted temperature sensors', '1 center humidity sensor', 'Power / current sensor in front of PDU'],
    };
    const rackUnits = Array.from({ length: 42 }, (_, index) => 42 - index);
    const [selectedDeviceId, setSelectedDeviceId] = useState('r730');
    const selectedRackItem = selectedDeviceId === rackSensorGroup.id
        ? rackSensorGroup
        : rackDevices.find((device) => device.id === selectedDeviceId) ?? rackDevices[0];
    const SelectedIcon = selectedRackItem.icon;
    const rackSensorMarkers = [
        { id: 'temp-upper-left', label: 'Temperature sensor 1', icon: Thermometer, top: '43%', left: '37%', className: 'border-orange-300/40 bg-orange-300/15 text-orange-100' },
        { id: 'temp-upper-right', label: 'Temperature sensor 2', icon: Thermometer, top: '43%', left: '63%', className: 'border-orange-300/40 bg-orange-300/15 text-orange-100' },
        { id: 'humidity-center', label: 'Humidity sensor', icon: Droplets, top: '52%', left: '50%', className: 'border-sky-300/40 bg-sky-300/15 text-sky-100' },
        { id: 'temp-lower-left', label: 'Temperature sensor 3', icon: Thermometer, top: '61%', left: '37%', className: 'border-orange-300/40 bg-orange-300/15 text-orange-100' },
        { id: 'temp-lower-right', label: 'Temperature sensor 4', icon: Thermometer, top: '61%', left: '63%', className: 'border-orange-300/40 bg-orange-300/15 text-orange-100' },
        { id: 'power-current', label: 'Power / current sensor in front of PDU', icon: Gauge, top: '91.5%', left: '72%', className: 'border-teal-400/40 bg-teal-400/15 text-teal-100' },
    ];
    const rackSelectableItems = [...rackDevices, rackSensorGroup];

    const getRackGridRow = (device) => {
        const topUnit = device.startU + device.sizeU - 1;
        return `${43 - topUnit} / span ${device.sizeU}`;
    };

    const getUnitRange = (device) => {
        const topUnit = device.startU + device.sizeU - 1;
        return device.sizeU === 1 ? `U${device.startU}` : `U${device.startU}-U${topUnit}`;
    };

    return (
        <div className="mt-4 max-w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-3 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-white sm:text-base">My current 42U home lab rack</h4>
                    <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                        This is my current self-contained rack-scale infrastructure setup, with compute, storage, networking, and power distribution arranged in one standardized datacenter cabinet.
                    </p>
                </div>
                <span className="shrink-0 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 text-xs font-medium text-indigo-200">
                    Current setup
                </span>
            </div>

            <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.05fr)] lg:gap-5">
                <div className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-2 sm:p-3">
                    <div className="grid h-[31rem] min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] gap-1 sm:h-[36rem] sm:grid-cols-[2rem_minmax(0,1fr)_1.25rem] sm:gap-2">
                        <div className="grid [grid-template-rows:repeat(42,minmax(0,1fr))] text-[8px] leading-none text-slate-600 sm:text-[9px]">
                            {rackUnits.map((unit) => (
                                <span key={unit} className="flex items-center justify-end pr-0.5 sm:pr-1">
                                    {unit % 2 === 0 ? `U${unit}` : ''}
                                </span>
                            ))}
                        </div>

                        <div className="relative rounded-md border border-slate-700/80 bg-black/40 p-1 shadow-inner shadow-black">
                            <div className="absolute inset-1 grid [grid-template-rows:repeat(42,minmax(0,1fr))] gap-px">
                                {rackUnits.map((unit) => (
                                    <div key={unit} className="rounded-[1px] border border-white/[0.03] bg-white/[0.025]" />
                                ))}
                            </div>

                            <div className="absolute inset-1 grid [grid-template-rows:repeat(42,minmax(0,1fr))] gap-px">
                                {rackDevices.map((device) => {
                                    const Icon = device.icon;
                                    const isSelected = selectedRackItem.id === device.id;

                                    return (
                                        <button
                                            key={device.id}
                                            type="button"
                                            onClick={() => setSelectedDeviceId(device.id)}
                                            onMouseEnter={() => setSelectedDeviceId(device.id)}
                                            onFocus={() => setSelectedDeviceId(device.id)}
                                            style={{ gridRow: getRackGridRow(device) }}
                                            aria-pressed={isSelected}
                                            className={`group flex min-h-0 touch-manipulation items-center justify-between gap-1 overflow-hidden rounded border px-1.5 text-left text-[9px] font-semibold leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:gap-2 sm:px-2 sm:text-[10px] ${device.className} ${isSelected ? 'ring-2 ring-white/40' : 'opacity-80 hover:opacity-100'}`}
                                        >
                                            <span className="flex min-w-0 items-center gap-1 sm:gap-1.5">
                                                <Icon className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
                                                <span className="truncate">{device.shortLabel}</span>
                                            </span>
                                            <span className="shrink-0 font-mono text-[8px] opacity-70 sm:text-[9px]">{getUnitRange(device)}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {rackSensorMarkers.map((sensor) => {
                                const Icon = sensor.icon;

                                return (
                                    <button
                                        key={sensor.id}
                                        type="button"
                                        title={sensor.label}
                                        onClick={() => setSelectedDeviceId(rackSensorGroup.id)}
                                        onMouseEnter={() => setSelectedDeviceId(rackSensorGroup.id)}
                                        onFocus={() => setSelectedDeviceId(rackSensorGroup.id)}
                                        style={{ top: sensor.top, left: sensor.left }}
                                        className={`absolute z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border shadow-lg shadow-black/30 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${sensor.className}`}
                                        aria-label={sensor.label}
                                        aria-pressed={selectedRackItem.id === rackSensorGroup.id}
                                    >
                                        <Icon className="h-3 w-3" />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="hidden [grid-template-rows:repeat(42,minmax(0,1fr))] sm:grid">
                            {rackUnits.map((unit) => (
                                <span key={unit} className="mx-auto my-0.5 h-1 w-1 rounded-full bg-slate-700" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-3 flex max-w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-1 lg:hidden">
                        {rackSelectableItems.map((item) => {
                            const Icon = item.icon;
                            const isSelected = selectedRackItem.id === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedDeviceId(item.id)}
                                    aria-pressed={isSelected}
                                    className={`flex max-w-[11rem] shrink-0 touch-manipulation items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${item.className} ${isSelected ? 'ring-2 ring-white/40' : 'opacity-80'}`}
                                >
                                    <Icon className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{item.shortLabel ?? item.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="min-w-0 flex flex-col gap-4">
                    <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border sm:h-10 sm:w-10 ${selectedRackItem.className}`}>
                                <SelectedIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                            <div className="min-w-0">
                                <p className="font-mono text-xs text-slate-500">{selectedRackItem.locationLabel ?? getUnitRange(selectedRackItem)}</p>
                                <h5 className="mt-1 text-base font-semibold text-white sm:text-lg">{selectedRackItem.title}</h5>
                                <p className="mt-2 text-sm leading-6 text-slate-400">{selectedRackItem.description}</p>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-2">
                            {selectedRackItem.details.map((detail) => (
                                <div key={detail} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">Rack scale</p>
                            <p className="mt-1 text-2xl font-bold text-white">42U</p>
                            <p className="mt-2 text-xs leading-5 text-slate-500">Full-height standardized datacenter cabinet.</p>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">Scope</p>
                            <p className="mt-1 text-sm font-semibold text-white">Compute, storage, network, console, power</p>
                            <p className="mt-2 text-xs leading-5 text-slate-500">A self-contained cabinet-scale lab environment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DnsInfo({ externalLinkProps }) {
    const nameserverRoutes = [
        { resolver: 'ns1.nameserver.ing', answer: 'one.ns.nameserver.ing' },
        { resolver: 'ns2.nameserver.ing', answer: 'two.ns.nameserver.ing' },
    ];
    const cloudflareRecords = {
        a: ['104.21.75.157', '172.67.178.111'],
        aaaa: ['2606:4700:3030::6815:4b9d', '2606:4700:3033::ac43:b26f'],
    };
    const hostingPath = [
        { label: 'DNS provider', value: 'nameserver.ing', tone: 'text-indigo-300' },
        { label: 'Public edge', value: 'Cloudflare IPs', tone: 'text-orange-200' },
        { label: 'Website host', value: 'hostname.ee', tone: 'text-emerald-300' },
    ];

    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-6">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    DNS
                </CardTitle>
                <CardDescription className="text-slate-400">
                    tony-liu.com routes through nameserver.ing, Cloudflare, and hostname.ee.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
                <div className="flex flex-col gap-3 rounded-lg border border-orange-500/20 bg-orange-500/10 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-orange-200">
                                <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
                                Protected by Cloudflare
                            </div>
                            <p className="mt-1 text-xs leading-5 text-orange-100/70">
                                Public A and AAAA records point at Cloudflare edge IPs.
                            </p>
                        </div>
                    </div>
                    <a {...externalLinkProps} href="https://hostname.ee" className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-400/15 sm:self-center">
                        Hosted through hostname.ee
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>

                <div className="grid gap-2 md:grid-cols-3">
                    {hostingPath.map((item) => (
                        <div key={item.label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">{item.label}</p>
                            <p className={`mt-1 truncate text-sm font-semibold ${item.tone}`}>{item.value}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Nameserver routing
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {nameserverRoutes.map((route) => (
                            <div key={route.resolver} className="rounded-lg border border-white/5 bg-black/20 p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Asked at</p>
                                <p className="mt-1 truncate font-mono text-xs text-slate-300">{route.resolver}</p>
                                <div className="my-2 h-px bg-white/10" />
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Returns</p>
                                <p className="mt-1 truncate font-mono text-xs text-indigo-300">{route.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            IPv4 A records
                        </h4>
                        <div className="grid gap-1.5">
                            {cloudflareRecords.a.map((ip) => (
                                <div key={ip} className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-black/20 px-2 py-1.5 text-xs">
                                    <span className="min-w-0 break-all font-mono text-slate-300">{ip}</span>
                                    <span className="shrink-0 rounded-full border border-orange-400/20 bg-orange-400/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-200">
                                        Cloudflare IP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            IPv6 AAAA records
                        </h4>
                        <div className="grid gap-1.5">
                            {cloudflareRecords.aaaa.map((ip) => (
                                <div key={ip} className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-black/20 px-2 py-1.5 text-xs">
                                    <span className="min-w-0 break-all font-mono text-slate-300">{ip}</span>
                                    <span className="shrink-0 rounded-full border border-orange-400/20 bg-orange-400/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-200">
                                        Cloudflare IP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-between gap-2 border-t border-white/10 bg-white/5 px-4 py-2 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                    WHOIS lookup
                </p>
                <p className="text-xs text-slate-500">
                    DNS by <a {...externalLinkProps} href="https://nameserver.ing" className="text-indigo-400 transition-colors hover:text-indigo-300">nameserver.ing</a>
                </p>
            </CardFooter>
        </Card>
    );
}

function UptimeBadge({ className = '', loading = 'lazy' }) {
    return (
        <a
            href="#status"
            aria-label="View uptime status"
            className="inline-flex max-w-full rounded-md border border-white/10 bg-white/5 p-px transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
            <Image
                src="https://img.shields.io/uptimerobot/status/m803126391-c9e521193579a442256878b6?style=for-the-badge&logo=uptimerobot&logoColor=white&label=uptime&labelColor=0f172a&up_color=10b981&down_color=ef4444"
                alt="UptimeRobot status"
                width={168}
                height={28}
                loading={loading}
                unoptimized
                className={`block h-7 w-auto max-w-full rounded-[5px] ${className}`}
            />
        </a>
    );
}

function FooterGroup({ group }) {
    const Icon = group.icon;

    return (
        <section className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-4 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                    <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">{group.title}</h4>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{group.description}</p>
                </div>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-400">
                {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                        <a
                            {...item.linkProps}
                            href={item.href}
                            className="group/link flex min-w-0 items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-indigo-300"
                        >
                            <span className="truncate">{item.label}</span>
                            {item.external && (
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover/link:opacity-100" />
                            )}
                        </a>
                    </li>
                ))}
            </ul>

            {group.note && (
                <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-2 text-xs font-medium text-emerald-200">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span>{group.note}</span>
                </div>
            )}

            {group.pills && (
                <div className="mt-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Nameservers</p>
                    <div className="grid gap-2">
                        {group.pills.map((pill) => (
                            <span key={pill} className="truncate rounded-md border border-white/5 bg-black/25 px-2 py-1.5 font-mono text-xs text-slate-400">
                                {pill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {group.statusBadge && (
                <div className="mt-4 overflow-hidden">
                    <UptimeBadge />
                </div>
            )}
        </section>
    );
}

function DomainRecordsGroup({ domains, externalLinkProps }) {
    const [aliasStartIndex, setAliasStartIndex] = useState(0);
    const domainGroups = domainTypeOrder
        .map((type) => ({
            type,
            ...domainTypeConfig[type],
            domains: domains.filter((domain) => normalizeDomainType(domain.type) === type),
        }))
        .filter((group) => group.domains.length > 0);

    const totalDomains = domains.length;
    const aliasCount = domains.filter((domain) => normalizeDomainType(domain.type) === 'alias').length;

    useEffect(() => {
        setAliasStartIndex((currentIndex) => Math.min(currentIndex, Math.max(aliasCount - aliasWindowSize, 0)));
    }, [aliasCount]);

    return (
        <section className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                        <Globe className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white">Domains</h4>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                            Grouped by primary, redirect, and alias records.
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 gap-2 text-[11px] font-medium">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-400">
                        {totalDomains} total
                    </span>
                    {aliasCount > 0 && (
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-cyan-200">
                            {aliasCount} aliases
                        </span>
                    )}
                </div>
            </div>

            <div>
                <div className="grid gap-4">
                    {domainGroups.map((group) => {
                        const isAliasGroup = group.type === 'alias';
                        const maxAliasStartIndex = Math.max(group.domains.length - aliasWindowSize, 0);
                        const currentAliasStartIndex = Math.min(aliasStartIndex, maxAliasStartIndex);
                        const visibleDomains = isAliasGroup
                            ? group.domains.slice(currentAliasStartIndex, currentAliasStartIndex + aliasWindowSize)
                            : group.domains;
                        const canPageAliases = isAliasGroup && group.domains.length > aliasWindowSize;
                        const canPageAliasesUp = currentAliasStartIndex > 0;
                        const canPageAliasesDown = currentAliasStartIndex < maxAliasStartIndex;

                        return (
                            <div key={group.type} className="min-w-0 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                                <div className="mb-2.5 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            {group.title}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-600">
                                            {group.description}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1.5">
                                        {canPageAliases && (
                                            <div className="flex overflow-hidden rounded-md border border-white/10 bg-white/5">
                                                <button
                                                    type="button"
                                                    aria-label="Previous aliases"
                                                    disabled={!canPageAliasesUp}
                                                    onClick={() => setAliasStartIndex((currentIndex) => Math.max(currentIndex - 1, 0))}
                                                    className="flex h-6 w-6 items-center justify-center text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                >
                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label="Next aliases"
                                                    disabled={!canPageAliasesDown}
                                                    onClick={() => setAliasStartIndex((currentIndex) => Math.min(currentIndex + 1, maxAliasStartIndex))}
                                                    className="flex h-6 w-6 items-center justify-center border-l border-white/10 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                >
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        )}
                                        <span className={`rounded-full border px-2 py-1 text-[11px] font-medium ${group.badgeClass}`}>
                                            {group.domains.length}
                                        </span>
                                    </div>
                                </div>

                                <div className={`grid gap-1.5 ${isAliasGroup ? '' : 'sm:grid-cols-2'}`}>
                                    {visibleDomains.map((domain) => (
                                        <a
                                            key={`${group.type}-${domain.url}`}
                                            {...externalLinkProps}
                                            href={domain.url}
                                            className="group/domain flex min-w-0 items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-indigo-300"
                                        >
                                            <span className="min-w-0 flex-1">
                                                <span className={`block font-mono text-[13px] leading-5 ${isAliasGroup ? 'truncate' : 'break-all'}`}>
                                                    {domain.label}
                                                </span>
                                            </span>
                                            <span className={`mt-0.5 shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${group.badgeClass}`}>
                                                {group.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const [isNestedFrame, setIsNestedFrame] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollOpacity, setScrollOpacity] = useState(1);
    const [projects, setProjects] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [domains, setDomains] = useState(defaultDomains);

    const getBadgeClasses = (color) => {
        const colorMap = {
            indigo: 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20',
            emerald: 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20',
            blue: 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20',
            purple: 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20',
            pink: 'bg-pink-500/10 text-pink-300 hover:bg-pink-500/20',
            orange: 'bg-orange-500/10 text-orange-300 hover:bg-orange-500/20',
            red: 'bg-red-500/10 text-red-300 hover:bg-red-500/20',
            green: 'bg-green-500/10 text-green-300 hover:bg-green-500/20',
            yellow: 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20',
            teal: 'bg-teal-500/10 text-teal-300 hover:bg-teal-500/20',
            cyan: 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20',
            sky: 'bg-sky-500/10 text-sky-300 hover:bg-sky-500/20',
            violet: 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20',
            fuchsia: 'bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20',
            rose: 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
            amber: 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20',
            lime: 'bg-lime-500/10 text-lime-300 hover:bg-lime-500/20',
            slate: 'bg-slate-500/10 text-slate-300 hover:bg-slate-500/20',
            gray: 'bg-gray-500/10 text-gray-300 hover:bg-gray-500/20',
            white: 'bg-white/10 text-white hover:bg-white/20',
        };
        return colorMap[color] || colorMap.indigo;
    };

    useEffect(() => {
        setMounted(true);
        try {
            setIsNestedFrame(window.self !== window.top);
        } catch {
            setIsNestedFrame(true);
        }

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    // Calculate opacity: 1 at top, 0 when scrolled past 50% of viewport
                    const newOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.5)));
                    setScrollOpacity(newOpacity);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('https://tonyliuzj.github.io/portfolio-static/data.json', {
                    cache: 'no-cache',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();
                if (!text.trim()) {
                    throw new Error('Empty response');
                }

                const data = parsePortfolioData(text);
                setProjects(parsePortfolioItems(data.projects));
                setWebsites(parsePortfolioItems(data.websites));
                setDomains(parseDomains(data.domains));
            } catch (error) {
                console.error('Failed to fetch content:', error);
            }
        };

        fetchContent();
    }, []);

    function useTypewriter(words, speed = 90, pause = 1500) {
        const [text, setText] = useState('');
        const [index, setIndex] = useState(0);
        const [isDeleting, setIsDeleting] = useState(false);
        const [waiting, setWaiting] = useState(false);

        useEffect(() => {
            if (waiting) return;

            const currentWord = words[index % words.length];

            const update = () => {
                setText((prev) => {
                    if (!isDeleting) {
                        const next = currentWord.substring(0, prev.length + 1);
                        if (next === currentWord) {
                            setWaiting(true);
                            setTimeout(() => {
                                setIsDeleting(true);
                                setWaiting(false);
                            }, pause);
                        }
                        return next;
                    } else {
                        const next = currentWord.substring(0, prev.length - 1);
                        if (next === '') {
                            setIsDeleting(false);
                            setIndex((prevIndex) => prevIndex + 1);
                        }
                        return next;
                    }
                });
            };

            const timer = setTimeout(update, isDeleting ? speed / 2 : speed);
            return () => clearTimeout(timer);
        }, [text, isDeleting, index, waiting, words, speed, pause]);

        return text;
    }

    const phrases = [
        "React", "Node.js", "Next.js", "Python",
        "JavaScript", "Go", "SQLite", "MySQL"
    ];

    const typedText = useTypewriter(phrases);
    const siteTitle = "Tony Liu";
    const siteUrl = "https://tony-liu.com";
    const logoPath = "/parrot.gif";
    const aboutMe = "Learning and building full stack web projects, with interests in home labs, DNS, virtualization, and networking infrastructure.";
    const externalLinkProps = isNestedFrame
        ? { target: '_top' }
        : { target: '_blank', rel: 'noopener noreferrer' };
    const sectionLinkProps = isNestedFrame ? { target: '_top' } : {};
    const aboutFocusGroups = [
        {
            title: 'Networking',
            description: 'How traffic moves, how networks connect, and how reachability is announced.',
            icon: Network,
            items: ['Overlay Networks', 'NAT and Networking Concepts', 'Network engineering, BGP and ASNs'],
        },
        {
            title: 'Infrastructure',
            description: 'The systems that keep services reachable, isolated, and understandable.',
            icon: Server,
            items: ['Domains and DNS', 'Virtualization, KVM and LXC Containers'],
        },
    ];

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Infrastructure', href: '#infrastructure' },
        { name: 'Contact', href: '#contact' },
    ];

    const footerGroups = [
        {
            title: 'Navigation',
            description: 'Jump around the page.',
            icon: Compass,
            items: navItems.map((item) => ({
                label: item.name,
                href: item.href,
                linkProps: sectionLinkProps,
            })),
        },
        {
            title: 'DNS',
            description: 'Records, provider, and nameservers.',
            icon: ShieldCheck,
            items: [
                {
                    label: 'Infrastructure',
                    href: '#infrastructure',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'DNS records',
                    href: '#dns',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'nameserver.ing',
                    href: 'https://nameserver.ing',
                    linkProps: externalLinkProps,
                    external: true,
                },
            ],
            note: 'Cloudflare protected',
            pills: ['ns1.nameserver.ing', 'ns2.nameserver.ing'],
        },
        {
            title: 'Status',
            description: 'Uptime and monitoring surfaces.',
            icon: Activity,
            items: [
                {
                    label: 'Live status',
                    href: '#status',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'Monitor page',
                    href: '#monitor',
                    linkProps: sectionLinkProps,
                },
            ],
            statusBadge: true,
        },
    ];

    return (
        <div className={`${inter.className} min-h-screen bg-black text-slate-300 selection:bg-indigo-500/30`}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={aboutMe} />
                <link rel="canonical" href={siteUrl} />
                <meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Tony Liu" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={aboutMe} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:image" content={`${siteUrl}${logoPath}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={aboutMe} />
                <meta name="twitter:image" content={`${siteUrl}${logoPath}`} />
            </Head>

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="relative z-50 mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-6">
                    <div className="flex items-center gap-2 justify-self-start">
                        <Image
                            src={logoPath}
                            alt=""
                            aria-hidden="true"
                            width={32}
                            height={32}
                            priority
                            unoptimized
                            className="h-8 w-8 shrink-0"
                        />
                        <h1 className="text-white font-bold text-lg tracking-tight">Tony Liu</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden justify-self-center md:flex gap-1">
                        {navItems.map((item) => (
                            <Button key={item.name} variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                                <a {...sectionLinkProps} href={item.href}>{item.name}</a>
                            </Button>
                        ))}
                    </nav>

                    <div className="hidden h-[30px] w-[250px] items-center justify-self-end overflow-hidden xl:flex">
                        <UptimeBadge loading="eager" />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="justify-self-end md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-300 hover:text-white hover:bg-white/10"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-slideDown max-h-[85vh] overflow-y-auto">
                        <nav className="flex flex-col p-4">
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start text-base font-medium text-slate-400 hover:text-white hover:bg-white/5 h-12 px-4"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <a {...sectionLinkProps} href={item.href}>{item.name}</a>
                                </Button>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <main id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden">
                
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    {/* The Blue Glow Effects - Controlled by scrollOpacity */}
                    <div 
                        className="transition-opacity duration-300 ease-out"
                        style={{ opacity: scrollOpacity }}
                    >
                        {/* Static center glow */}
                        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                        
                        {/* Dynamic Mouse Follower */}
                        {mounted && (
                            <div
                                className="absolute bg-indigo-500/15 rounded-full blur-3xl -z-10 transition-transform duration-75 will-change-transform"
                                style={{
                                    width: '400px',
                                    height: '400px',
                                    left: 0,
                                    top: 0,
                                    transform: `translate(${position.x - 200}px, ${position.y - 200}px)`,
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center max-w-6xl mx-auto pt-20">

                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white animate-slideUp">
                        Hello, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
                            I am Tony
                        </span>
                    </h2>

                    <div className={`${mono.className} text-sm md:text-base text-slate-400 mb-6 h-8 flex items-center justify-center gap-2 animate-fadeIn delay-150`}>
                        <span className="text-indigo-400">{'>'}</span>
                        <span className="hidden sm:inline">const currentFocus =</span>
                        <span className="sm:hidden">focus =</span>
                        <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 px-2 py-1 font-normal">
                            "{typedText}"
                        </Badge>
                    </div>

                    <div className="max-w-3xl w-full px-4 mb-10 animate-fadeIn delay-200">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 shadow-xl shadow-black/20">
                            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-medium tracking-wide">
                                {aboutMe}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 animate-fadeIn delay-300 flex-col sm:flex-row w-full sm:w-auto px-6 sm:px-0">
                        <Button asChild size="lg" className="rounded-full font-semibold px-8 h-12 w-full sm:w-auto">
                            <a href="#about">About Me</a>
                        </Button>
                        <Button asChild size="lg" className="rounded-full px-8 h-12 bg-white font-bold text-black shadow-xl shadow-indigo-500/25 ring-2 ring-indigo-300/50 hover:bg-slate-100 hover:text-black hover:ring-indigo-200 w-full sm:w-auto">
                            <a
                                {...externalLinkProps}
                                href="https://github.com/tonyliuzj"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full font-semibold px-8 h-12 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white w-full sm:w-auto">
                            <a href="#work">View Work</a>
                        </Button>
                    </div>

                    {/* Scroll Down Indicator */}
                    <div 
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 transition-opacity duration-500"
                        style={{ opacity: scrollOpacity }}
                    >
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-6 h-6 text-indigo-400" />
                    </div>
                </section>

                {/* Tech Stack Marquee (Mockup) */}
                <div className="w-full mb-20 overflow-hidden relative z-10 opacity-50 px-4">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-16 text-slate-600 font-bold uppercase tracking-widest text-xs md:text-sm text-center">
                        <span>React</span>
                        <span>Next.js</span>
                        <span>TypeScript</span>
                        <span>Node.js</span>
                        <span>Python</span>
                        <span>Go</span>
                    </div>
                </div>

                {/* About Section */}
                <section id="about" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <SectionHeader
                        eyebrow="About"
                        title="Building web projects while learning the infrastructure underneath"
                        description="I am interested in networking, DNS, virtualization, and internet infrastructure."
                    />

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                                    <Route className="h-4 w-4" />
                                </span>
                                <div>
                                    <h4 className="text-base font-semibold text-white">About me</h4>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        I am a student learning full-stack development by building and shipping small web projects. I also like home labbing and working with rack-scale infrastructure.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {['Full-stack learning', 'Home labbing', 'Infrastructure-minded', 'Builds in public'].map((item) => (
                                    <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs font-medium text-slate-400">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {aboutFocusGroups.map((group) => {
                                const Icon = group.icon;

                                return (
                                    <div key={group.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                                        <div className="flex items-start gap-3">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <h4 className="text-base font-semibold text-white">{group.title}</h4>
                                                <p className="mt-2 text-sm leading-6 text-slate-500">{group.description}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid gap-2">
                                            {group.items.map((item) => (
                                                <div key={item} className="flex items-center gap-2 rounded-md border border-white/5 bg-black/20 px-2.5 py-2 text-xs font-medium text-slate-300">
                                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <RackModel />
                </section>

                {/* Work Section */}
                <section id="work" data-nosnippet="" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <SectionHeader
                        eyebrow="Work"
                        title="Projects and Websites"
                        description="A focused collection of shipped projects, experiments, and public web surfaces."
                    />

                    <div id="projects" className="scroll-mt-24">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <h4 className="text-xl font-semibold text-white">Featured Projects</h4>
                                <p className="mt-1 text-sm text-slate-500">Code-heavy work and practical builds.</p>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400">
                                {projects.length} projects
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <a key={project.id} {...externalLinkProps} href={project.url} className="block">
                                    <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center text-xl text-white">
                                                {project.title}
                                                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-slate-400 mb-4 text-sm md:text-base">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.badges.map((badge, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className={getBadgeClasses(badge.color)}
                                                    >
                                                        {badge.text}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </div>
                    </div>

                    {websites.length > 0 && (
                        <div id="websites" className="mt-14 scroll-mt-24">
                            <div className="mb-5 flex items-end justify-between gap-4">
                                <div>
                                    <h4 className="text-xl font-semibold text-white">Websites</h4>
                                    <p className="mt-1 text-sm text-slate-500">Deployed web properties and public pages.</p>
                                </div>
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400">
                                    {websites.length} sites
                                </span>
                            </div>
                            <div className={`grid gap-8 ${websites.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'}`}>
                                {websites.map((website) => (
                                    <a key={website.id} {...externalLinkProps} href={website.url} className="block">
                                        <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                            <CardHeader>
                                                <CardTitle className="flex flex-col gap-2 text-xl text-white sm:flex-row sm:items-start sm:justify-between">
                                                    <span className="min-w-0 break-words leading-7">
                                                        {website.title}
                                                    </span>
                                                    <span className="inline-flex min-w-0 items-start gap-2 sm:ml-4 sm:max-w-[55%] sm:justify-end">
                                                        <span className="min-w-0 break-all font-mono text-xs font-normal leading-5 text-slate-500 transition-colors group-hover:text-slate-400 sm:text-right">
                                                            {website.url}
                                                        </span>
                                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <p className="text-slate-400 mb-4 text-sm md:text-base">
                                                    {website.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {website.badges.map((badge, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className={getBadgeClasses(badge.color)}
                                                        >
                                                            {badge.text}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Infrastructure Section */}
                <section id="infrastructure" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <SectionHeader
                        eyebrow="Infrastructure"
                        title="DNS, Status, and Monitoring"
                        description="The public operations layer for the portfolio, including DNS records and live monitoring surfaces."
                    />

                    <div id="dns" className="scroll-mt-24">
                        <DnsInfo externalLinkProps={externalLinkProps} />
                        <div className="mt-4">
                            <DomainRecordsGroup domains={domains} externalLinkProps={externalLinkProps} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-8">
                        <BrowserFrame
                            id="status"
                            url="https://statusno.de/"
                            src="https://statusno.de/"
                            title="System Status"
                            footerHref="https://github.com/tonyliuzj/kumaview"
                            footerLabel="KumaView"
                            externalLinkProps={externalLinkProps}
                        />
                        <BrowserFrame
                            id="monitor"
                            url="https://monitorno.de"
                            src="https://monitorno.de"
                            title="Monitor"
                            footerHref="https://github.com/tonyliuzj/pocketview"
                            footerLabel="PocketView"
                            externalLinkProps={externalLinkProps}
                        />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <Card className="bg-gradient-to-b from-white/5 to-transparent border-white/10 overflow-hidden backdrop-blur-sm">
                        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                                <p className="text-slate-400 max-w-md">
                                    Feel free to reach out for collaborations, opportunities, or just to say hi. I'm always open to discussing new projects and ideas.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <Button asChild size="lg" className="bg-white hover:bg-slate-200 text-black border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a href="mailto:tony@liuzj.net">
                                        <span>Email Me</span>
                                        <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#0077b5] hover:bg-[#006399] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a
                                        {...externalLinkProps}
                                        href="https://www.linkedin.com/in/tonyliuzj"
                                    >
                                        <span>LinkedIn</span>
                                        <Linkedin className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a
                                        {...externalLinkProps}
                                        href="https://github.com/tonyliuzj"
                                    >
                                        <span>GitHub</span>
                                        <Github className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/10 bg-black py-10 sm:py-14">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,2.2fr)]">
                        <div className="max-w-sm">
                            <h3 className="text-xl font-bold tracking-tight text-white">Tony Liu</h3>
                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                Learning full-stack development and shipping small, useful web projects.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <a {...externalLinkProps} href="https://github.com/tonyliuzj" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Github className="h-4 w-4" />
                                </a>
                                <a {...externalLinkProps} href="https://www.linkedin.com/in/tonyliuzj" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a href="mailto:tony@liuzj.net" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Mail className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <FooterGroup group={footerGroups[0]} />
                            {footerGroups.slice(1).map((group) => (
                                <FooterGroup key={group.title} group={group} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                        <p>© {new Date().getFullYear()} Tony Liu. tony-liu.com. All rights reserved.</p>
                        <p className="text-xs text-slate-600">Designed and built with Next.js</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
