import { memo, useId } from 'react';

// Front-panel references and variant assumptions: docs/homelab-model.md.
// 600 drawing units = 19 inches; one rack unit = 55.3 drawing units.
const range = count => Array.from({ length: count }, (_, index) => index);

export function hardwareGeometry(device) {
    const depth = {
        'r730': 240, 'r730xd': 240, 'cisco-isr4331': 145,
        'cisco-catalyst-3850': 150, 'tp-link-sg3428': 65,
        'apc-netbotz-570': 85, 'apc-ap7921': 38, 'apc-ap7921b': 38,
        'apc-ap4423-ats': 85, 'dell-monitor': 20, 'keyboard-tray': 100,
    }[device.id] ?? (device.id.startsWith('tray') ? 105 : 12);
    return { depth, metal: ['Compute', 'Storage', 'Network'].includes(device.type) ? 'silver' : 'black' };
}

function Label({ x, y, children, size = 5, fill = '#bac0c4', ...props }) {
    return <text x={x} y={y} fill={fill} fontSize={size} fontFamily="Arial, sans-serif" {...props}>{children}</text>;
}

function Screw({ x, y }) {
    return <g transform={`translate(${x} ${y})`}><circle r="2.6" fill="#0d1012" stroke="#747a7f" strokeWidth=".8" /><path d="M-1.5 0h3M0-1.5v3" stroke="#93989b" strokeWidth=".65" /></g>;
}

function Led({ x, y, color = '#80cc65', on = true }) {
    return <g><circle cx={x} cy={y} r="1.9" fill="#080c0b" /><circle cx={x} cy={y} r="1.15" fill={on ? color : '#35413a'} />{on && <circle cx={x} cy={y} r="3.1" fill={color} opacity=".12" />}</g>;
}

function Rj45({ x, y, number, active = false, shield = true }) {
    return <g transform={`translate(${x} ${y})`} data-port="rj45">
        <rect width="17" height="14" rx=".7" fill={shield ? '#919799' : '#282c2f'} stroke="#141719" strokeWidth="1" />
        <path d="M2 2h13v8h-3v2H5v-2H2Z" fill="#050708" />
        <path d="M4 2v3m1.4-3v3m1.4-3v3m1.4-3v3m1.4-3v3m1.4-3v3m1.4-3v3" stroke="#bca878" strokeWidth=".65" />
        {active && <rect x="1" y="11" width="2.5" height="1.5" fill="#8bd36b" />}
        {number !== undefined && <Label x="8.5" y="-2" size="3.5" textAnchor="middle">{number}</Label>}
    </g>;
}

function Usb({ x, y, vertical = false }) {
    return <g transform={`translate(${x} ${y})${vertical ? ' rotate(90)' : ''}`}><rect width="13" height="6" rx=".6" fill="#a5aaab" /><rect x="1.2" y="1.1" width="10.6" height="3.8" fill="#080b0d" /><path d="M3 3h7" stroke="#5d6366" strokeWidth="1.2" /></g>;
}

function Vga({ x, y }) {
    return <g transform={`translate(${x} ${y})`}><path d="M0 0h20l-3 10H3Z" fill="#9ca3a7" /><path d="M2 1.5h16l-2 7H4Z" fill="#233442" />{range(10).map(i => <circle key={i} cx={5 + i % 5 * 2.4} cy={3.6 + Math.floor(i / 5) * 2.5} r=".5" fill="#a6aab0" />)}</g>;
}

function Sfp({ x, y, number }) {
    return <g transform={`translate(${x} ${y})`} data-port="sfp"><rect width="19" height="10" fill="#92989a" /><rect x="1" y="1" width="17" height="8" fill="#101519" /><path d="M3 3h13M3 7h13" stroke="#40474b" /><rect x="7" y="7" width="6" height="2" fill="#aeb5b6" />{number && <Label x="9" y="-3" size="3.5" textAnchor="middle">{number}</Label>}</g>;
}

function CiscoLogo({ x, y, color = '#d5dade' }) {
    return <g transform={`translate(${x} ${y})`} fill={color}>{[4, 7, 11, 7, 4, 7, 11, 7, 4].map((height, i) => <rect key={i} x={i * 3.3} y={11 - height} width="1.6" height={height} rx=".8" />)}<Label x="0" y="19" size="8" fill={color} letterSpacing="1.2">cisco</Label></g>;
}

function MountingEars({ height, server = false }) {
    return <g>{[0, 582].map(x => <g key={x} transform={`translate(${x} 0)`}>
        <rect x=".5" y="1" width="17" height={height - 2} rx={server ? 2 : .5} fill={server ? '#2e3235' : '#3d4347'} stroke="#676d70" strokeWidth=".8" />
        {[10, height - 10].map(y => <g key={y}><rect x="4" y={y - 2.5} width="9" height="5" rx="2.5" fill="#080b0e" /><Screw x="8.5" y={y} /></g>)}
        {server && <path d={`M4 20h9v${height - 40}H4Z`} fill="#15191c" stroke="#535b5e" />}
    </g>)}</g>;
}

function DellCaddy({ x, y, width, height, index, vertical = false, vent }) {
    return <g transform={`translate(${x} ${y})`} data-drive-bay={index}>
        <rect width={width} height={height} rx="1.7" fill="#0b0e10" stroke="#747b7e" strokeWidth=".8" />
        <rect x="2" y="2" width={width - 4} height={height - 4} rx="1" fill="#24292c" />
        <rect x="3" y={vertical ? 17 : 3} width={vertical ? width - 6 : width * .68} height={vertical ? height - 35 : height - 6} fill={`url(#${vent})`} />
        {vertical ? <>
            <path d={`M3 12h${width - 6}v7H3ZM3 ${height - 20}h${width - 6}v7H3Z`} fill="#4b5255" stroke="#737c80" strokeWidth=".6" />
            <rect x="5" y={height - 11} width={width - 10} height="6" rx="1" fill="#14191b" stroke="#586165" />
            <Led x={width / 2} y={height - 7} on={index % 4 !== 3} />
        </> : <>
            <path d={`M${width * .72} 3h${width * .24}v${height - 6}h-${width * .24}Z`} fill="#41494c" stroke="#6d777a" strokeWidth=".7" />
            <rect x={width * .79} y="5" width={width * .12} height="7" rx="1" fill="#141a1e" />
            <Led x={width * .83} y={height - 6} on={index % 3 !== 2} />
        </>}
        <Label x={vertical ? width / 2 : 5} y={vertical ? 8 : 8} size="4.5" textAnchor={vertical ? 'middle' : 'start'} fill="#c5cbd0">{index}</Label>
    </g>;
}

function DellServer({ xd, ids, bezel }) {
    return <>
        <rect x="18" y="1" width="564" height="108" fill={`url(#${ids.dark})`} stroke="#858c8f" />
        <MountingEars height={110} server />
        {xd ? <>
            {range(12).map(i => <DellCaddy key={i} x={39 + i % 4 * 130.7} y={5 + Math.floor(i / 4) * 33.4} width={128} height={31.4} index={i} vent={ids.mesh} />)}
            <Label x="22" y="9" size="4">DELL</Label><Led x="28" y="20" color="#85bdfa" /><Led x="28" y="31" />
            <rect x="22" y="79" width="10" height="3" fill="#4b94d4" />
            <Usb x="575" y="64" vertical /><Vga x="565" y="88" />
        </> : <>
            <rect x="21" y="3" width="170" height="103" rx="1" fill="#171c1f" stroke="#4d5559" />
            <Label x="25" y="12" size="8" fill="#e0e5e7" fontWeight="bold">DELL</Label>
            <Label x="127" y="12" size="5.7" fill="#e0e5e7" fontStyle="italic">PowerEdge R730</Label>
            <Led x="32" y="23" /><Led x="45" y="23" color="#81b2ed" /><Vga x="59" y="19" />
            <rect x="102" y="20" width="38" height="10" rx="1" fill="#152e3a" stroke="#778d95" />
            <Label x="105" y="27" size="4.4" fill="#9dcbdf">R730</Label><Label x="145" y="27" size="7">‹ ✓ ›</Label>
            <rect x="23" y="36" width="165" height="15" fill="#303639" stroke="#596064" strokeWidth=".7" />
            <Label x="27" y="46" size="5">DVD</Label><path d="M51 45h107" stroke="#0b0e10" strokeWidth="2" /><rect x="169" y="41" width="9" height="4" fill="#161b1e" />
            <rect x="44" y="56" width="142" height="45" rx="2" fill={`url(#${ids.mesh})`} stroke="#4b5559" />
            <Usb x="36" y="60" vertical /><Usb x="36" y="84" vertical />
            {range(16).map(i => <DellCaddy key={i} x={195 + i * 23.65} y={4} width={22.1} height={102} index={i} vertical vent={ids.mesh} />)}
        </>}
        <rect x="587" y="89" width="8" height="12" fill="#317cb8" /><Label x="588" y="94" size="2.5" fill="#fff">intel</Label>
        {bezel && <g data-bezel="dell-13g">
            <path d="M22 9Q300-6 578 9V99Q300 112 22 99Z" fill={`url(#${ids.silver})`} stroke="#a7b0b4" />
            <path d="M33 18Q300 6 568 18V91Q300 101 33 91Z" fill={`url(#${ids.mesh})`} stroke="#51595d" />
            <path d="M220 15h148l25 39-25 42H220l-25-42Z" fill="#697277" stroke="#b2b9bd" />
            <circle cx="294" cy="54" r="20" fill="#1b2227" stroke="#b5bdc0" strokeWidth="1.5" />
            <Label x="279" y="58" size="10" fill="#dbe2e5" fontWeight="bold">DELL</Label>
            <Label x="390" y="89" size="5.5" fill="#e0e7eb">PowerEdge {xd ? 'R730xd' : 'R730'}</Label>
            {!xd && <><rect x="49" y="33" width="49" height="13" rx="2" fill="#153445" stroke="#6e858e" /><Label x="54" y="42" size="5" fill="#bddfed">R730</Label></>}
        </g>}
    </>;
}

function Switch({ tpLink, ids }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${tpLink ? ids.dark : ids.silver})`} stroke="#747e84" />
        <MountingEars height={55} />
        {tpLink ? <>
            <Label x="29" y="17" size="11" fill="#eef3f3" fontWeight="bold">tp-link</Label><Label x="29" y="29" size="5.5">TL-SG3428</Label><Label x="29" y="40" size="4">JetStream Gigabit Switch</Label>
            {range(28).map(i => <Led key={i} x={106 + Math.floor(i / 2) * 6.1} y={26 + i % 2 * 7} on={i % 4 === 0} />)}
            <Label x="105" y="18" size="4">LINK / ACT</Label><Rj45 x="198" y="29" /><Label x="192" y="24" size="3.6">CONSOLE</Label><Usb x="200" y="13" />
        </> : <>
            <CiscoLogo x="28" y="12" color="#4d626f" />
            <Label x="74" y="12" size="4.2" fill="#34454e">Catalyst 3850</Label>
            {range(6).map(i => <g key={i}><Led x={78 + i % 3 * 20} y={23 + Math.floor(i / 3) * 9} on={i === 0} /><Label x={82 + i % 3 * 20} y={24 + Math.floor(i / 3) * 9} size="2.9" fill="#34434b">{['SYST', 'ACTV', 'XPS', 'STAT', 'SPEED', 'PoE'][i]}</Label></g>)}
            <circle cx="146" cy="31" r="4" fill="#474f55" stroke="#a0a8ad" /><Label x="139" y="43" size="3.4" fill="#34434b">MODE</Label>
            <Usb x="166" y="17" /><Usb x="166" y="32" />
        </>}
        {range(24).map(i => {
            const column = Math.floor(i / 2);
            return <Rj45 key={i} x={(tpLink ? 229 : 199) + column * 19 + Math.floor(column / 4) * 4} y={i % 2 === 0 ? 11 : 33} number={i + 1} active={i % 5 === 0} />;
        })}
        <rect x={tpLink ? 477 : 446} y="5" width={tpLink ? 99 : 130} height="45" rx="1" fill={tpLink ? '#272e32' : '#9da6aa'} stroke="#5a666d" />
        <Label x={tpLink ? 483 : 455} y="13" size="4.3" fill={tpLink ? '#bac2c6' : '#3c4b53'}>{tpLink ? 'SFP' : 'NETWORK MODULE'}</Label>
        {range(4).map(i => <Sfp key={i} x={(tpLink ? 484 : 467) + i * 22} y="30" number={25 + i} />)}
    </>;
}

function Router({ ids }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${ids.dark})`} stroke="#737e83" /><MountingEars height={55} />
        <Usb x="30" y="36" /><Rj45 x="52" y="10" /><Rj45 x="52" y="31" /><Rj45 x="78" y="10" active /><Usb x="80" y="35" />
        <Label x="28" y="10" size="3.5">CONSOLE</Label><Label x="80" y="7" size="3.5">MGMT</Label>
        <rect x="108" y="9" width="194" height="37" fill={`url(#${ids.mesh})`} stroke="#5b656a" strokeWidth=".7" />
        <CiscoLogo x="325" y="25" /><Label x="314" y="10" size="5">ISR 4331</Label>
        {range(6).map(i => <Led key={i} x={313 + i * 9} y="17" on={i < 2} />)}
        <rect x="383" y="9" width="118" height="37" fill={`url(#${ids.mesh})`} stroke="#5b656a" strokeWidth=".7" />
        <rect x="516" y="11" width="32" height="33" rx="4" fill="#929b9e" stroke="#171e22" />
        <path d="M522 17h20v18h-20Z" fill="#11171b" /><path d="M527 23v7m6-12v8m6-3v7" stroke="#a9b0b2" strokeWidth="2" />
        <rect x="559" y="18" width="10" height="21" rx="2" fill="#11181c" stroke="#9aa5aa" /><Label x="562" y="25" size="6">I</Label>
    </>;
}

function Outlet({ x, index }) {
    return <g transform={`translate(${x} 13)`} data-outlet="c13"><rect width="43" height="30" rx="2" fill="#343a3d" stroke="#687174" /><path d="M5 4h33v15l-6 7H11l-6-7Z" fill="#101518" stroke="#737d81" /><path d="M12 10v7m9-11v7m9-3v7" stroke="#020405" strokeWidth="3" /><Label x="21" y="38" size="4.5" textAnchor="middle">{index}</Label></g>;
}

function Pdu({ ids, newer }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${ids.dark})`} stroke="#5f696e" /><MountingEars height={55} />
        <rect x="26" y="10" width="29" height="35" rx="2" fill="#101619" stroke="#828c92" /><path d="M33 21v9m7-15v9m7-3v9" stroke="#a6afb2" strokeWidth="2.5" />
        {range(8).map(i => <Outlet key={i} x={62 + i * 46} index={i + 1} />)}
        <rect x="436" y="19" width="27" height="19" rx="1" fill="#160d0c" stroke="#526066" /><Label x="440" y="33" size="14" fill="#cf6152" fontFamily="monospace">--</Label><Label x="441" y="46" size="4.5">Amps</Label>
        <circle cx="478" cy="29" r="6" fill="#283a43" stroke="#7996a5" />
        {[0, 1, 2].map(i => <Led key={i} x={440 + i * 8} y="11" on={i === 0} />)}
        <Rj45 x="499" y="7" active /><Rj45 x="499" y="33" shield={false} />
        <Label x="527" y="31" size="15" fill={newer ? '#bce0d2' : '#d76367'} fontWeight="bold">APC</Label><Label x="524" y="41" size="3.4">Switched Rack PDU</Label><Label x="531" y="48" size="4">{newer ? 'AP7921B' : 'AP7921'}</Label>
    </>;
}

function Ats({ ids }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${ids.dark})`} stroke="#646e73" /><MountingEars height={55} />
        <Label x="38" y="15" size="5.5">Automatic Transfer Switch</Label><Label x="38" y="24" size="4">AP4423</Label>
        <circle cx="140" cy="30" r="8" fill="#202b2d" stroke="#91b6b1" /><Label x="134" y="32" size="6" fill="#abd3c9">A/B</Label><Label x="126" y="47" size="4">Preference</Label>
        <path d="M151 30h26m0-14v28M193 14h43l44 16h43M193 45h43l44-15" fill="none" stroke="#526761" strokeWidth="1" />
        <Label x="180" y="16" size="5">A</Label><Label x="180" y="47" size="5">B</Label><Label x="328" y="32" size="4">OUT</Label>
        {range(7).map(i => <Led key={i} x={198 + i * 18} y={i < 3 ? 14 : 30} on />)}
        {range(3).map(i => <Led key={i} x={198 + i * 18} y="45" on={false} />)}
        <path d="M371 3v49" stroke="#667074" /><Screw x="375" y="28" />
        <rect x="400" y="12" width="64" height="32" rx="1" fill="#101d20" stroke="#526468" /><Label x="407" y="26" size="5" fill="#94bab5">SOURCE A</Label><Label x="407" y="36" size="5" fill="#94bab5">PREFERRED</Label>
        {[14, 28, 42].map(y => <circle key={y} cx="476" cy={y} r="5" fill="#293f43" stroke="#a7c2c2" />)}
        <Rj45 x="493" y="8" active /><Rj45 x="493" y="34" shield={false} /><Usb x="522" y="24" />
        <Label x="547" y="40" size="13" fill="#d56164" fontWeight="bold" transform="rotate(-90 547 40)">APC</Label>
    </>;
}

function Netbotz({ ids }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${ids.dark})`} stroke="#626c72" /><MountingEars height={55} />
        <rect x="28" y="14" width="28" height="29" rx="2" fill="#0c1215" stroke="#69767d" /><path d="M35 24v9m7-16v8m7-1v9" stroke="#959fa4" strokeWidth="2" />
        <Label x="28" y="9" size="4">AC LINE IN</Label><Usb x="75" y="22" vertical /><Rj45 x="113" y="21" active />
        {[91, 143, 190].map((x, i) => <g key={x}><rect x={x} y="18" width={i === 0 ? 15 : 43} height="15" fill="#2879b7" stroke="#64b0e4" />{range(i === 0 ? 2 : 6).map(j => <rect key={j} x={x + 2 + j * 6.5} y="21" width="4" height="8" fill="#083955" />)}</g>)}
        <Label x="143" y="12" size="3.8">RELAY OUTPUTS</Label><Label x="242" y="9" size="4">UNIVERSAL SENSORS</Label>
        {range(6).map(i => <Rj45 key={i} x={243 + i % 3 * 18} y={12 + Math.floor(i / 3) * 22} />)}
        {['LEAK', 'BEACON', 'A-LINK'].map((text, i) => <g key={text}><Rj45 x={307 + i * 27} y="23" shield={false} /><Label x={307 + i * 27} y="16" size="3.4">{text}</Label></g>)}
        <Led x="392" y="24" on={false} /><Led x="408" y="24" /><Label x="400" y="14" size="3.7">POWER</Label>
        <rect x="423" y="19" width="9" height="9" fill="#0b1115" stroke="#9da6aa" />
        {[450, 480].map(x => <g key={x}><Usb x={x} y="18" /><Usb x={x} y="30" /></g>)}
        <Label x="535" y="19" size="13" fill="#cf5f61" fontWeight="bold">APC</Label><Label x="530" y="34" size="5">NetBotz</Label><Label x="524" y="43" size="5">Rack Monitor 570</Label>
    </>;
}

function Passive({ device, ids }) {
    return <>
        <rect x="18" y="1" width="564" height="53" fill={`url(#${ids.dark})`} stroke="#535f65" /><MountingEars height={55} />
        {device.id.startsWith('patch') ? range(24).map(i => <g key={i}>
            <rect x={29 + i * 22.5} y="7" width="19" height="8" fill="#cacbbf" /><Label x={38 + i * 22.5} y="13" size="5" fill="#252b29" textAnchor="middle">{i + 1}</Label>
            <Rj45 x={30 + i * 22.5} y="24" shield={false} />
        </g>) : device.id.startsWith('cable') ? <>
            <rect x="28" y="11" width="544" height="32" rx="2" fill="#0b1013" stroke="#535d62" />
            {range(22).map(i => <path key={i} d={`M${35 + i * 24} 12v30h10V12`} fill="#30383c" stroke="#586167" strokeWidth=".65" />)}
        </> : device.id.startsWith('tray') ? <>
            <path d="M28 42h544v9H28Z" fill="#5c686e" /><path d="M35 8v34m530-34v34" stroke="#515e65" strokeWidth="3" />
        </> : <path d="M27 5h546M27 50h546" stroke="#55616a" strokeWidth=".6" />}
    </>;
}

function Console({ monitor, ids }) {
    if (!monitor) return <>
        <rect x="18" y="2" width="564" height="51" fill={`url(#${ids.dark})`} stroke="#5f6a70" /><MountingEars height={55} />
        <rect x="111" y="4" width="306" height="30" rx="3" fill="#181e22" stroke="#66747c" />
        {range(42).map(i => <rect key={i} x={118 + i % 14 * 20.5} y={8 + Math.floor(i / 14) * 7} width="17" height="5" rx=".8" fill="#485158" stroke="#798087" strokeWidth=".3" />)}
        <ellipse cx="457" cy="18" rx="12" ry="15" fill="#343e46" stroke="#7b868e" /><path d="M457 4v12m-11 0h22" stroke="#11181c" />
        <rect x="24" y="37" width="552" height="15" fill="#2b343b" stroke="#66747c" /><rect x="259" y="40" width="82" height="7" rx="2" fill="#0c1216" />
    </>;
    return <>
        <path d="M35 180h530v7H35Z" fill="#46525a" /><path d="M286 174v-18h28v18" fill="#303d45" />
        <rect x="158" y="13" width="284" height="153" rx="5" fill="#171e24" stroke="#626f76" strokeWidth="2" />
        <rect x="168" y="23" width="264" height="128" rx="1" fill="#07121a" />
        <path d="M168 23h264v39Z" fill="#24394b" opacity=".28" />
        <Label x="180" y="42" size="7" fill="#afc8c9">Local console</Label><Label x="180" y="58" size="6" fill="#7ca5ac">homelab tty1</Label>
        <Label x="180" y="84" size="6" fill="#a4c7b3">login:</Label><rect x="204" y="79" width="4" height="7" fill="#93bca5" />
        <Label x="289" y="161" size="7" fill="#a3aeb4">DELL</Label><Led x="425" y="158" color="#8ec8e5" />
    </>;
}

const HardwareVisual = memo(function HardwareVisual({ device, bezel = false }) {
    const instance = useId().replace(/:/g, '');
    const ids = { dark: `${instance}-dark`, silver: `${instance}-silver`, mesh: `${instance}-mesh` };
    const height = device.sizeU * 55;
    let face;
    if (device.id === 'r730' || device.id === 'r730xd') face = <DellServer xd={device.id === 'r730xd'} ids={ids} bezel={bezel} />;
    else if (device.id === 'cisco-isr4331') face = <Router ids={ids} />;
    else if (device.type === 'Network') face = <Switch tpLink={device.id === 'tp-link-sg3428'} ids={ids} />;
    else if (device.id === 'apc-ap4423-ats') face = <Ats ids={ids} />;
    else if (device.type === 'Power') face = <Pdu ids={ids} newer={device.id === 'apc-ap7921b'} />;
    else if (device.type === 'Telemetry') face = <Netbotz ids={ids} />;
    else if (device.type === 'Console') face = <Console monitor={device.id === 'dell-monitor'} ids={ids} />;
    else face = <Passive device={device} ids={ids} />;
    return <svg viewBox={`0 0 600 ${height}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-hardware={device.id}>
        <defs>
            <linearGradient id={ids.dark} x2="0" y2="1"><stop stopColor="#414a50" /><stop offset=".1" stopColor="#30383e" /><stop offset=".52" stopColor="#20272d" /><stop offset="1" stopColor="#11181d" /></linearGradient>
            <linearGradient id={ids.silver} x2="0" y2="1"><stop stopColor="#c9cfd1" /><stop offset=".12" stopColor="#a6afb3" /><stop offset=".5" stopColor="#88969d" /><stop offset=".92" stopColor="#b2bcc0" /><stop offset="1" stopColor="#5a6971" /></linearGradient>
            <pattern id={ids.mesh} width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#444f55" /><path d="M1.5.7h3L5.7 3 4.5 5.3h-3L.3 3Z" fill="#080f14" stroke="#6c777d" strokeWidth=".4" /></pattern>
        </defs>
        {face}
    </svg>;
});

export default HardwareVisual;
