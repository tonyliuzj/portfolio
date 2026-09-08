# Homelab hardware model

The rack uses original SVG front-panel drawings on CSS 3D chassis. The same drawing appears in the rack and the enlarged hardware viewer. No third-party photographs, remote textures, or WebGL dependencies are shipped.

## References and configurations

| Device | Drawn configuration and reference |
| --- | --- |
| Dell PowerEdge R730 | Existing 16 × 2.5-inch configuration retained. Sixteen upright carriers occupy the right side; the left contains the LCD/control panel, VGA, optical drive, USB ports and intake grille. [Dell manual](https://www.dell.com/support/manuals/en-us/poweredge-r730-dsms/R730_OMPublication/front-panel?guid=guid-e9c3a2de-c937-4a4a-ab2f-76df042ec706&lang=en-us), [front photograph](https://media.gekko-computer.de/images/Shop1600px/10008446_2.jpg). |
| Dell PowerEdge R730xd | Existing 12 × 3.5-inch configuration retained: three rows of four horizontal carriers, with narrow control panels at the sides. [Dell front-panel guide](https://www.dell.com/support/manuals/en-us/poweredge-r730xd/r730xd_ompublication/12-x-35-inch-hard-drive?guid=guid-c57fd7f1-0ff2-4fd2-9049-ee01ba547bde). |
| Cisco ISR4331 | Bezel side: management/console connections at left, perforated fan grilles, central indicators, AC inlet and switch at right. [Cisco installation guide, figure 1-22](https://www.cisco.com/c/en/us/td/docs/routers/access/4400/hardware/installation/guide4400-4300/C4400_isr/Overview.html). |
| Cisco Catalyst 3850 | Representative 24-port copper chassis and four-port uplink module. Status/USB controls on the left, two rows of RJ45 ports, separate uplink module on the right. The inventory does not identify the exact Catalyst SKU or installed module. [Cisco product overview](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3850/hardware/installation/guide/b_c3850_hig/m_prod_over.html). |
| TP-Link SG3428 | Charcoal face, LED matrix and console at left, three blocks of eight copper ports, four SFP cages at right. [TP-Link product page](https://www.tp-link.com/sg/business-networking/managed-switch/tl-sg3428/v1/), [visual reference](https://www.hellasdigital.gr/images/detailed/25/1_large_1600909103119p.jpg). Hardware-revision cosmetics may differ. |
| APC AP7921 / AP7921B | C20 input at left, eight C13 receptacles, current display, control button and management ports at right. [Schneider product page](https://www.se.com/us/en/product/AP7921B/apc-netshelter-switched-rack-pdu-1u-1ph-3-7kw-230v-16a-or-3-3kw-208v-16a-8-c13-outlets-c20-cord/). |
| APC AP4423 ATS | Front A/B source-selection diagram, display and management controls. Output receptacles are on the rear and are not drawn on the front. [Schneider overview](https://www.se.com/us/en/download/document/990-5839_EN/), [visual reference](https://cdnsenetic.blob.core.windows.net/%24web/APC_AP4423_INT_1.jpg). |
| APC NetBotz 570 | AC inlet, blue relay/terminal blocks, six sensor connections, alarm/A-Link ports, console and paired USB sockets. [Schneider appliance guide](https://iportal.se.com/Contents/docs/UPS-NBWL0355A_USER%20GUIDE.PDF), [visual reference](https://secure.ups-trader.co.uk/6331-thickbox_default/netbotz-570.jpg). |

The Dell drive configurations follow the previous implementation; they have not been confirmed from photos of the owner's rack. The optional bezel is a representative 13th-generation Dell cover. Monitor, keyboard, shelves, cable managers, and patch panels are representative because no exact part numbers are recorded. Indicators and console content are illustrative, not live telemetry. Chassis depths distinguish full-depth servers, switches, shallow PDUs, and passive panels; they are visual approximations rather than manufacturing dimensions.

## Rendering and interaction

- Front-panel artwork uses a 600-unit width with 55 units of height per rack unit; SVG aspect ratios are preserved. Rack slots and inventory positions are unchanged.
- `hardwareGeometry()` controls chassis depth and metal finish per device.
- SVG gradients and perforation patterns use React `useId()` so rack and close-up instances cannot collide.
- Device selection does not turn the machines on or off. Illumination is stable; selection uses an external outline.
- Front/angled detail and Dell bezel controls update the existing local view only. The rack remains selectable by keyboard and the full-size inventory list remains available on touch devices.
- Motion follows the section's reduced-motion preference.
