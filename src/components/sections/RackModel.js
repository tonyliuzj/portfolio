import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Box, ChevronLeft, ChevronRight, RotateCcw, MoveHorizontal, Server, Zap } from 'lucide-react';
import HardwareVisual, { hardwareGeometry } from './RackHardware';
import { rackDevices, rackUnitLabel } from './rackDevices';
import styles from './RackModel.module.css';

const colors = { Compute: '#93b4ff', Storage: '#e6bd79', Network: '#7ad4b1', Power: '#ed9b87', Console: '#c1a1e8', Telemetry: '#85cbd7', Passive: '#96969f' };
const groups = ['All', 'Compute', 'Storage', 'Network', 'Power', 'Console', 'Telemetry', 'Passive'];
const occupiedUnits = rackDevices.reduce((total, device) => total + device.sizeU, 0);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function RackDevice({ device, selected, onSelect, bezel = false, preview = false }) {
    const geometry = hardwareGeometry(device);
    const machineStyle = { '--device-color': colors[device.type], '--device-depth': `${geometry.depth}px` };
    const faces = <>
        <span className={styles.deviceTop} aria-hidden="true"><span className={styles.chassisLabel}>{device.shortLabel}</span></span>
        <span className={styles.deviceSide} aria-hidden="true" />
        <span className={styles.deviceSideLeft} aria-hidden="true" />
        <span className={styles.deviceBottom} aria-hidden="true" />
        <span className={styles.deviceFront} aria-hidden="true"><HardwareVisual device={device} bezel={bezel} /></span>
    </>;
    if (preview) return <div className={styles.previewMachine} data-metal={geometry.metal} data-console={device.id === 'dell-monitor'} style={{ ...machineStyle, aspectRatio: `600 / ${device.sizeU * 55}` }}>{faces}</div>;
    return (
        <button type="button" className={styles.device}
            style={{ ...machineStyle, gridRow: `${44 - device.startU - device.sizeU} / span ${device.sizeU}` }} data-metal={geometry.metal} data-console={device.id === 'dell-monitor'}
            data-selected={selected} aria-label={`${device.title}, ${rackUnitLabel(device)}`}
            aria-pressed={selected} aria-controls="rack-inspector" title={`${rackUnitLabel(device)} · ${device.title}`}
            onClick={() => onSelect(device.id)}>
            {faces}
            <span className={styles.deviceMarker} aria-hidden="true" />
        </button>
    );
}

export default function RackModel() {
    const [selectedId, setSelectedId] = useState('r730');
    const [filter, setFilter] = useState('All');
    const [rotation, setRotation] = useState({ x: -5, y: -22 });
    const [dragging, setDragging] = useState(false);
    const [bezel, setBezel] = useState(false);
    const [detailFront, setDetailFront] = useState(false);
    const drag = useRef(null);
    const reducedMotion = useReducedMotion();
    const activeItem = rackDevices.find(device => device.id === selectedId);
    const visibleDevices = rackDevices.filter(device => filter === 'All' || device.type === filter);
    const ActiveIcon = activeItem.icon;

    function selectDevice(id) {
        setSelectedId(id);
        const device = rackDevices.find(item => item.id === id);
        if (filter !== 'All' && device.type !== filter) setFilter('All');
    }

    function startDrag(event) {
        if (event.button !== 0 || event.target.closest('button')) return;
        drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rotation };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
    }

    function moveDrag(event) {
        if (!drag.current || event.pointerId !== drag.current.pointerId) return;
        setRotation({
            x: clamp(drag.current.rotation.x - (event.clientY - drag.current.y) * 0.12, -12, 12),
            y: clamp(drag.current.rotation.y + (event.clientX - drag.current.x) * 0.25, -40, 40),
        });
    }

    function endDrag() {
        drag.current = null;
        setDragging(false);
    }

    return (
        <section id="homelab" aria-labelledby="homelab-title" className={styles.lab}>
            <div className={styles.heading}>
                <div>
                    <p className={styles.eyebrow}><span /> 01.1 / The home lab</p>
                    <h3 id="homelab-title">Big ideas.<br /><span>Physical hardware.</span></h3>
                </div>
                <div className={styles.intro}>
                    <p>My hands-on playground for the infrastructure underneath the software. A 42U rack for exploring networking, virtualization, and self-hosting.</p>
                    <a href="#rack-explorer">Take a closer look <ArrowDown size={14} /></a>
                </div>
            </div>
            <div className={styles.summary} aria-label="Rack overview">
                <div><strong>42<span>U</span></strong><span>Full-height rack</span></div>
                <div><strong>02</strong><span>Dell PowerEdge servers</span></div>
                <div><strong>{String(rackDevices.filter(device => device.type === 'Network').length).padStart(2, '0')}</strong><span>Network devices</span></div>
                <div><strong>{String(42 - occupiedUnits).padStart(2, '0')}<span>U</span></strong><span>Room to expand</span></div>
            </div>
            <div id="rack-explorer" className={styles.explorer}>
                <div className={styles.viewer}>
                    <div className={styles.viewerHeader}>
                        <span><Box size={14} /> Rack / 001</span><span className={styles.viewLabel}>Interactive rack</span>
                    </div>
                    <div className={styles.stage} data-dragging={dragging}
                        onPointerDown={startDrag} onPointerMove={moveDrag}
                        onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
                        <div className={styles.floor} aria-hidden="true" />
                        <div className={styles.rackPosition} style={{ '--rack-centering': `${-96 - Math.abs(rotation.y) * 1.8}px` }}>
                            <div className={styles.rack} style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transition: dragging || reducedMotion ? 'none' : undefined }}>
                                <div className={styles.cabinetBack} aria-hidden="true" />
                                <div className={styles.cabinetSide} aria-hidden="true"><span>TL / LAB</span></div>
                                <div className={styles.cabinetSideLeft} aria-hidden="true" />
                                <div className={styles.cabinetTop} aria-hidden="true" />
                                <div className={styles.cabinetBase} aria-hidden="true" />
                                <div className={styles.rackCrown} aria-hidden="true"><span>HOME LAB</span><span>42U</span></div>
                                <div className={styles.railLeft} aria-hidden="true" /><div className={styles.railRight} aria-hidden="true" />
                                <div className={styles.unitLabels} aria-hidden="true">
                                    {Array.from({ length: 42 }, (_, index) => <span key={index}>{String(42 - index).padStart(2, '0')}</span>)}
                                </div>
                                <div className={styles.deviceStack}>
                                    <div className={styles.expansionLabel} aria-hidden="true">SPACE TO BUILD</div>
                                    {rackDevices.map(device => <RackDevice key={device.id} device={device} selected={selectedId === device.id} onSelect={selectDevice} bezel={bezel} />)}
                                </div>
                                <div className={styles.rackFootLeft} aria-hidden="true" /><div className={styles.rackFootRight} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.controls} role="group" aria-label="Rack view controls">
                        <div className={styles.viewButtons}>
                            <button type="button" aria-pressed={rotation.y === -22 && rotation.x === -5} onClick={() => setRotation({ x: -5, y: -22 })}><Box size={13} /> 3D</button>
                            <button type="button" aria-pressed={rotation.y === 0 && rotation.x === 0} onClick={() => setRotation({ x: 0, y: 0 })}><Server size={13} /> Front</button>
                        </div>
                        <div className={styles.viewButtons}>
                            <button type="button" aria-label="Rotate rack left" disabled={rotation.y <= -40} onClick={() => setRotation(value => ({ ...value, y: clamp(value.y - 10, -40, 40) }))}><ChevronLeft size={15} /></button>
                            <button type="button" aria-label="Reset rack view" onClick={() => setRotation({ x: -5, y: -22 })}><RotateCcw size={13} /></button>
                            <button type="button" aria-label="Rotate rack right" disabled={rotation.y >= 40} onClick={() => setRotation(value => ({ ...value, y: clamp(value.y + 10, -40, 40) }))}><ChevronRight size={15} /></button>
                        </div>
                    </div>
                    <p className={styles.hint}><MoveHorizontal size={13} /> Drag the background to rotate · Select a device to explore</p>
                </div>
                <div className={styles.sidebar}>
                    <figure className={styles.hardwarePreview} aria-label={`Enlarged ${activeItem.title} model`}>
                        <figcaption><span>Hardware close-up</span><span>{activeItem.shortLabel}</span></figcaption>
                        <div className={styles.previewStage} data-front={detailFront}>
                            <RackDevice device={activeItem} preview bezel={bezel} />
                        </div>
                        <div className={styles.previewControls}>
                            <button type="button" aria-pressed={detailFront} onClick={() => setDetailFront(value => !value)}>{detailFront ? 'Angled view' : 'Front detail'}</button>
                            {['r730', 'r730xd'].includes(activeItem.id) && <button type="button" aria-pressed={bezel} onClick={() => setBezel(value => !value)}>{bezel ? 'Remove bezel' : 'Fit front bezel'}</button>}
                            <span>Illustrated hardware</span>
                        </div>
                    </figure>
                    <div id="rack-inspector" className={styles.inspector} style={{ '--device-color': colors[activeItem.type] }}>
                        <div className={styles.inspectorLabel}><span>Inside the rack</span><span>{rackUnitLabel(activeItem)}</span></div>
                        <motion.div key={activeItem.id} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                            <div className={styles.deviceCategory}><ActiveIcon size={17} /><span>{activeItem.type}</span></div>
                            <h4>{activeItem.title}</h4>
                            <p className={styles.description}>{activeItem.description}</p>
                            <ul className={styles.specs}>{activeItem.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                            {activeItem.electrical && <details className={styles.electrical}>
                                <summary><Zap size={13} /> Power & electrical <span>+</span></summary>
                                <ul>{activeItem.electrical.map(spec => <li key={spec}>{spec}</li>)}</ul>
                            </details>}
                            <div className={styles.deviceMeta}><span>{activeItem.sizeU}U form factor</span><span>{activeItem.electrical ? 'Powered equipment' : 'Passive hardware'}</span></div>
                        </motion.div>
                    </div>
                    <div className={styles.inventory}>
                        <div className={styles.inventoryHeading}><h4>Explore the hardware</h4><span>{rackDevices.length} items</span></div>
                        <div className={styles.filters} role="group" aria-label="Filter rack devices">
                            {groups.map(group => <button type="button" key={group} aria-pressed={filter === group} onClick={() => setFilter(group)}>{group}</button>)}
                        </div>
                        <div className={styles.deviceList} data-lenis-prevent role="group" aria-label={`${filter} rack devices`}>
                            {visibleDevices.map(device => <button type="button" key={device.id} aria-pressed={selectedId === device.id} aria-controls="rack-inspector" onClick={() => selectDevice(device.id)} style={{ '--device-color': colors[device.type] }}>
                                <span className={styles.inventoryDot} /><span className={styles.inventoryName}>{device.shortLabel}</span><span className={styles.unitBadge}>{rackUnitLabel(device)}</span><ArrowUpRight size={13} />
                            </button>)}
                        </div>
                        <span className="sr-only" role="status">Selected: {activeItem.title}, {rackUnitLabel(activeItem)}. Showing {visibleDevices.length} devices.</span>
                    </div>
                </div>
            </div>
            <div className={styles.labFooter}><span>Built to learn. Always evolving.</span><span>Networking / Virtualization / Self-hosting</span></div>
        </section>
    );
}
