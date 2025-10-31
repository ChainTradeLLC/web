// "use client";

// import { IoClose as CloseIcon } from "react-icons/io5";
// import {
//   animate,
//   AnimatePresence,
//   motion,
//   useTime,
//   useTransform,
// } from "motion/react";
// import { useEffect, useRef, useState } from "react";
// import { Field, Label } from "@/src/components/ui/fieldset";
// import { Input } from "@/src/components/ui/input";
// import { Heading } from "@/src/components/ui/heading";
// import { fireCelebration } from "@/src/app/lib/confettiPresets";
// import styl from "./modal.module.scss";
// import localFont from "next/font/local";
// //@ts-ignore
// import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";

// export default function WaitlistHeader() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 1.05 }}
//         className={`${Nexa_Bold.className} openButton rounded-md px-3 py-2 text-sm font-bold uppercase shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
//         onClick={() => setIsOpen(true)}
//         data-primary-action
//       >
//         Join Waitlist
//       </motion.button>
//       <AnimatePresence>
//         {isOpen ? <Dialog close={() => setIsOpen(false)} /> : null}
//       </AnimatePresence>
//       <StyleSheet />
//     </>
//   );
// }

// function Dialog({ close }: { close: () => void }) {
//   const ref = useRef<HTMLDialogElement>(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [badgeState, setBadgeState] = useState<keyof typeof STATES>("idle");
//   const [transit, setTransit] = useState(false);

//   const DISABLED_STATES = ["processing", "success", "error"];
//   const isDisabled = DISABLED_STATES.includes(badgeState);

//   const joinWaitlist = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("form state:", name, email);
//     setBadgeState("processing");

//     const res = await fetch(`/api/waitlist`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email }),
//     });
//     const data = await res.json();
//     console.log("Join Waitlist response:", data);

//     if (res.ok) {
//       console.log("Event registered:", data);
//       setBadgeState("success");
//       setName("");
//       setEmail("");
//       setTimeout(() => setTransit(true), 2000);
//       setTimeout(async () => await fireCelebration(), 3000);
//       setTimeout(() => close(), 6000);
//     } else {
//       setBadgeState("error");
//     }
//   };

//   useEffect(() => {
//     if (!ref.current) return;

//     ref.current.showModal();

//     return () => ref.current?.close();
//   }, [ref]);

//   useEffect(() => {
//     if (!ref.current) return;
//   }, []);

//   useClickOutside(ref, close);

//   return (
//     <>
//       <motion.div
//         className="overlay"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       ></motion.div>
//       <motion.dialog
//         initial={dialogInitialState}
//         animate={dialogOpenState}
//         exit={dialogInitialState}
//         ref={ref}
//         className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         open={false}
//         onCancel={(event) => {
//           event.preventDefault();
//           close();
//         }}
//         onClose={close}
//         style={{ transformPerspective: 500 }}
//       >
//         {!transit ? (
//           <form onSubmit={joinWaitlist} className="">
//             <Heading className="title capitalize opacity-80">
//               Enter your details
//             </Heading>
//             <Field className="mb-4">
//               <Label className="opacity-80">FullName</Label>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 name="name"
//                 required
//               />
//             </Field>
//             <Field>
//               <Label className="opacity-80">Email</Label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 name="email"
//                 required
//               />
//             </Field>
//             <div className="controls">
//               <button onClick={close} className="cancel">
//                 Cancel
//               </button>
//               <button
//                 disabled={isDisabled}
//                 className={`transition-opacity ${
//                   isDisabled ? "opacity-60 cursor-not-allowed" : ""
//                 } save`}
//                 type="submit"
//               >
//                 <Badge state={badgeState} />
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div
//             className={`${styl.status} ${transit === true ? `${styl.animatee}` : ""}`}
//           >
//             <div className={`${styl.icon}`}>
//               <svg
//                 id="veegee"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 64 64"
//               >
//                 <g>
//                   <g id="Outline">
//                     <g>
//                       <path
//                         className={`${styl.path_1}`}
//                         d="M8.21985,28.95823c.48833.1076,1.04334-.09755,1.17805-.72972,1.7583-8.24463,9.16113-14.22852,17.60205-14.22852,3.64844,0,7.15576,1.08691,10.14307,3.14355.45361.31299,1.07764.19727,1.39062-.25684.31299-.45459.19824-1.07764-.25684-1.39062-3.32227-2.28711-7.22168-3.49609-11.27686-3.49609-9.37841,0-17.60399,6.64989-19.5581,15.81149-.13199.6188.28967,1.03914.778,1.14674Z"
//                       />
//                       <path
//                         className={`${styl.path_2}`}
//                         d="M45.49409,27.59766c-.54248.10254-.89941.62549-.79639,1.16846.20068,1.06055.30225,2.14844.30225,3.23389,0,9.92529-8.07471,18-18,18-8.44092,0-15.84375-5.98389-17.60205-14.22852-.11523-.54053-.64697-.88965-1.18652-.76953-.54004.11523-.88477.64648-.76953,1.18652,1.9541,9.16162,10.17969,15.81152,19.55811,15.81152,11.02783,0,20-8.97217,20-20,0-1.20947-.11328-2.42285-.3374-3.60596-.10303-.54199-.62354-.90137-1.16846-.79639Z"
//                       />
//                       <path
//                         className={`${styl.path_3}`}
//                         d="M26.99995,18c2.46338,0,4.87939.64795,6.9873,1.87402.47754.27832,1.08984.11621,1.36719-.36133.27783-.47754.11572-1.08984-.36133-1.36719-2.41309-1.40381-5.17676-2.14551-7.99316-2.14551-1.86724,0-3.73184.3234-5.48696.9618-1.71066.62223-3.31096,1.54024-4.71261,2.70156-1.40427,1.16349-2.60549,2.56807-3.5383,4.13502-.96477,1.62063-1.63884,3.40998-1.99301,5.26213-.02755.14406-.05262.28848-.07673.43313-.12744.80811-.19238,1.65137-.19238,2.50635,0,8.82227,7.17773,16,16,16,.95166,0,1.87305-.07959,2.71826-.23291.56982-.09131,1.14746-.2251,1.76172-.40723,6.70508-1.95312,11.33057-7.9585,11.50977-14.94385.01416-.55225-.42188-1.01123-.97363-1.02539-.55371-.05518-1.01172.42139-1.02539.97363-.15723,6.1123-4.2041,11.3667-10.07471,13.07715-.53564.15869-1.03076.27344-1.53418.35449-.74805.13525-1.54932.2041-2.38184.2041-7.71973,0-14-6.28027-14-14,0-.79135.06609-1.58078.1958-2.36133,1.15381-6.74365,6.95947-11.63867,13.8042-11.63867Z"
//                       />
//                       <path
//                         className={`${styl.path_4}`}
//                         d="M56.95552,14.70508c-.12939-.41895-.51709-.70508-.95557-.70508h-8.65723c-.15527,0-.30859.03613-.44727.10547-5.42578,2.71289-10.19629,6.40918-14.17822,10.98584l-2.60254,2.99023-7.29492-3.96045c-.38965-.21191-.87109-.14111-1.18408.17188l-3.82861,3.82861c-.2168.2168-.32227.521-.28613.8252.03662.30469.21045.5752.47168.73535,4.3418,2.65186,8.10693,6.30518,10.8877,10.56445l.625.95703c.18164.27783.48877.44727.82031.45312h.01709c.3252,0,.63086-.1582.81836-.42529l.7998-1.13818c6.69824-9.53467,14.97559-17.69922,24.60254-24.26709.3623-.24756.52148-.70166.39209-1.12109ZM30.37202,38.87549c-2.68994-4.03662-6.21777-7.5459-10.26904-10.22168l2.41895-2.41895,7.34375,3.9873c.41113.22217.92334.13086,1.23145-.22266l3.12891-3.5957c3.7583-4.31885,8.25-7.81836,13.354-10.40381h5.26904c-8.70605,6.354-16.25684,14.03711-22.47705,22.87549Z"
//                       />
//                       <circle cx="7.99995" cy="32" r="1" />
//                     </g>
//                   </g>
//                 </g>
//               </svg>
//             </div>
//             <p>Thank you for joining our waitlist</p>
//           </div>
//         )}
//         <button className="closeButton" aria-label="Close" onClick={close}>
//           <CloseIcon />
//         </button>
//       </motion.dialog>
//     </>
//   );
// }

// const dialogOpenState = {
//   opacity: 1,
//   filter: "blur(0px)",
//   rotateX: 0,
//   rotateY: 0,
//   z: 0,
//   transition: {
//     delay: 0.2,
//     duration: 0.5,
//     ease: [0.17, 0.67, 0.51, 1],
//     opacity: {
//       delay: 0.2,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// const dialogInitialState = {
//   opacity: 0,
//   filter: "blur(10px)",
//   z: -100,
//   rotateY: 25,
//   rotateX: 5,
//   transformPerspective: 500,
//   transition: {
//     duration: 0.3,
//     ease: [0.67, 0.17, 0.62, 0.64],
//   },
// };

// /**
//  * ==============   Utils   ================
//  */

// function useClickOutside(
//   reff: React.RefObject<HTMLDialogElement | null>,
//   close: VoidFunction,
// ) {
//   useEffect(() => {
//     const handleClickOutside = (event: React.MouseEvent<Element>) => {
//       if (reff.current && checkClickOutside(event, reff.current)) {
//         close();
//       }
//     };

//     document.addEventListener("click", handleClickOutside as any);

//     return () => {
//       document.removeEventListener("click", handleClickOutside as any);
//     };
//   }, [reff]);
// }

// function checkClickOutside(
//   event: React.MouseEvent<Element>,
//   element: HTMLDialogElement,
// ) {
//   const { top, left, width, height } = element.getBoundingClientRect();

//   if (
//     event.clientX < left ||
//     event.clientX > left + width ||
//     event.clientY < top ||
//     event.clientY > top + height
//   ) {
//     return true;
//   }
// }

// /**
//  * ==============   Types   ================
//  */
// interface Dialog {
//   isOpen: boolean;
//   open: () => void;
//   close: () => void;
//   reff: React.RefObject<HTMLDialogElement | null>;
// }

// /**
//  * ==============   Styles   ================
//  */
// function StyleSheet() {
//   return (
//     <style>{`
//             .openButton {
//             background: #0f0f0f;
//       color: #F5F5F5;
//     &:hover, &:focus {
//       background: #FFC300;
//     color: #080808;
//     }
//             }

//         .controls button {
//         background-color: #ffc300;
//             color: #080808;
//             font-size: 16px;
//             font-weight: 700;
//             padding: 10px 20px;
//             border-radius: 10px;
//         }

//         .controls {
//             border-top: 1px solid var(--divider);
//             padding-top: 20px;
//             margin-top: 20px;
//             display: flex;
//             justify-content: flex-end;
//             gap: 10px;
//         }

//         .controls button.cancel {
//             background-color: var(--divider);
//             color: #f5f5f5;
//         }

//         .controls button.save {
//             width: max-content;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             color: #1f1f1f !important;
//             text-transform: uppercase;
//         }

//         .modal {
//             border-radius: 10px;
//             border: 1px solid #212121;
//             background-color: #080808;
//             z-index: 10000000;
//             padding: 20px;
//             // min-width: 50%;
//         }

//         .modal p {
//             margin: 0;
//             color: #f5f5f5;
//         }

//         .modal::backdrop {
//             display: none;
//         }

//         .title {
//             font-size: 24px;
//             margin: 0 0 20px;
//         }

//         .closeButton {
//             position: absolute;
//             top: 20px;
//             right: 20px;
//             color: #f5f5f5;
//         }

//         .overlay {
//             background: rgba(0, 0, 0, 0.5);
//             position: fixed;
//             inset: 0;
//             z-index: 9999999;
//             backdrop-filter: blur(3px);
//         }
//     `}</style>
//   );
// }

// const Badge = ({ state }: { state: keyof typeof STATES }) => {
//   const badgeRef = useRef(null);

//   useEffect(() => {
//     if (!badgeRef.current) return;

//     if (state === "error") {
//       animate(
//         badgeRef.current,
//         { x: [0, -6, 6, -6, 0] },
//         {
//           duration: 0.3,
//           ease: "easeInOut",
//           times: [0, 0.25, 0.5, 0.75, 1],
//           repeat: 0,
//           delay: 0.1,
//         },
//       );
//     } else if (state === "success") {
//       animate(
//         badgeRef.current,
//         {
//           scale: [1, 1.2, 1],
//         },
//         {
//           duration: 0.3,
//           ease: "easeInOut",
//           times: [0, 0.5, 1],
//           repeat: 0,
//         },
//       );
//     }
//   }, [state]);

//   return (
//     <motion.div
//       ref={badgeRef}
//       style={{
//         ...styles.badgee,
//         gap: state === "idle" ? 0 : 8,
//       }}
//     >
//       {/* <Icon state={state} /> */}
//       <Labelaa state={state} />
//     </motion.div>
//   );
// };

// /**
//  * ==============   Icons   ================
//  */
// const Icon = ({ state }: { state: keyof typeof STATES }) => {
//   let IconComponent = <></>;

//   switch (state) {
//     case "idle":
//       IconComponent = <></>;
//       break;
//     case "processing":
//       IconComponent = <Loader />;
//       break;
//     case "success":
//       IconComponent = <Check />;
//       break;
//     case "error":
//       IconComponent = <X />;
//       break;
//   }

//   return (
//     <>
//       <motion.span
//         style={styles.iconContainerr}
//         animate={{
//           width: state === "idle" ? 0 : 20,
//         }}
//         transition={SPRING_CONFIG}
//       >
//         <AnimatePresence>
//           <motion.span
//             key={state}
//             style={styles.iconn}
//             initial={{
//               y: -40,
//               scale: 0.5,
//               filter: "blur(6px)",
//               WebkitFilter: "blur(6px)",
//             }}
//             animate={{
//               y: 0,
//               scale: 1,
//               filter: "blur(0px)",
//               WebkitFilter: "blur(0px)",
//             }}
//             exit={{
//               y: 40,
//               scale: 0.5,
//               filter: "blur(6px)",
//               WebkitFilter: "blur(6px)",
//             }}
//             transition={{
//               duration: 0.15,
//               ease: "easeInOut",
//             }}
//           >
//             {IconComponent}
//           </motion.span>
//         </AnimatePresence>
//       </motion.span>
//     </>
//   );
// };

// const ICON_SIZE = 20;
// const STROKE_WIDTH = 1.5;
// const VIEW_BOX_SIZE = 24;

// const svgProps = {
//   width: ICON_SIZE,
//   height: ICON_SIZE,
//   viewBox: `0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`,
//   fill: "none",
//   stroke: "currentColor",
//   strokeWidth: STROKE_WIDTH,
//   strokeLinecap: "round" as const,
//   strokeLinejoin: "round" as const,
// };

// const springConfig = {
//   type: "spring",
//   stiffness: 150,
//   damping: 20,
// };

// const animations = {
//   initial: { pathLength: 0 },
//   animate: { pathLength: 1 },
//   transition: springConfig,
// };

// const secondLineAnimation = {
//   ...animations,
//   transition: { ...springConfig, delay: 0.1 },
// };

// function Check() {
//   return (
//     <motion.svg {...svgProps}>
//       <motion.polyline points="4 12 9 17 20 6" {...animations} />
//     </motion.svg>
//   );
// }

// function Loader() {
//   const time = useTime();
//   const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });

//   return (
//     <motion.div
//       style={{
//         rotate,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: ICON_SIZE,
//         height: ICON_SIZE,
//       }}
//     >
//       <motion.svg {...svgProps}>
//         <motion.path d="M21 12a9 9 0 1 1-6.219-8.56" {...animations} />
//       </motion.svg>
//     </motion.div>
//   );
// }

// function X() {
//   return (
//     <motion.svg {...svgProps}>
//       <motion.line x1="6" y1="6" x2="18" y2="18" {...animations} />
//       <motion.line x1="18" y1="6" x2="6" y2="18" {...secondLineAnimation} />
//     </motion.svg>
//   );
// }

// const Labelaa = ({ state }: { state: keyof typeof STATES }) => {
//   const [labelWidth, setLabelWidth] = useState(0);

//   const measureRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (measureRef.current) {
//       const { width } = measureRef.current.getBoundingClientRect();
//       setLabelWidth(width);
//     }
//   }, [state]);

//   return (
//     <>
//       {/* Hidden copy of label to measure width */}
//       <div
//         ref={measureRef}
//         style={{
//           position: "absolute",
//           visibility: "hidden",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {STATES[state]}
//       </div>

//       <motion.span
//         layout
//         style={{
//           position: "relative",
//         }}
//         animate={{
//           width: labelWidth <= 0 ? "auto" : labelWidth,
//         }}
//         transition={SPRING_CONFIG}
//       >
//         <AnimatePresence mode="sync" initial={false}>
//           <motion.div
//             key={state}
//             style={{
//               textWrap: "nowrap",
//             }}
//             initial={{
//               y: -20,
//               opacity: 0,
//               filter: "blur(10px)",
//               WebkitFilter: "blur(10px)",
//               position: "absolute",
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//               filter: "blur(0px)",
//               WebkitFilter: "blur(0px)",
//               position: "relative",
//             }}
//             exit={{
//               y: 20,
//               opacity: 0,
//               filter: "blur(10px)",
//               WebkitFilter: "blur(10px)",
//               position: "absolute",
//             }}
//             transition={{
//               duration: 0.2,
//               ease: "easeInOut",
//             }}
//           >
//             {STATES[state]}
//           </motion.div>
//         </AnimatePresence>
//       </motion.span>
//     </>
//   );
// };

// /**
//  * ==============   Styles   ================
//  */
// type Styles = {
//   [K: string]: React.CSSProperties | Styles;
// };
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     height: 80,
//   },
//   badgee: {
//     backgroundColor: "#ffc300",
//     color: "#080808",
//     fontWeight: 700,
//     display: "flex",
//     overflow: "hidden",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "12px 20px",
//     borderRadius: 10,
//     willChange: "transform, filter",
//   },
//   iconContainerr: {
//     height: 20,
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconn: {
//     position: "absolute",
//     left: 0,
//     top: 0,
//   },
// } as const satisfies Styles;

// const STATES = {
//   idle: "Join",
//   processing: "Processing...",
//   success: "Succesful ✅",
//   error: "Something went wrong",
// } as const;

// // const getNextState = (state: keyof typeof STATES) => {
// //     const states = Object.keys(STATES) as (keyof typeof STATES)[]
// //     const nextIndex = (states.indexOf(state) + 1) % states.length
// //     return states[nextIndex]
// // }

// const SPRING_CONFIG = {
//   type: "spring",
//   stiffness: 600,
//   damping: 30,
// };
