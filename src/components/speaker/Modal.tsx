// "use client";

// import { IoClose as CloseIcon } from "react-icons/io5";
// // import { AnimatePresence, motion } from "motion/react"
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
// import { Textarea } from "@/src/components/ui/textarea";
// // import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'

// /**
//  * This example shows how to use the `motion.dialog`
//  * component.
//  */

// export default function Modal() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 1.05 }}
//         className="openButton"
//         onClick={() => setIsOpen(true)}
//         data-primary-action
//       >
//         New Speaker
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
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [job, setJob] = useState("");
//   const [badgeState, setBadgeState] = useState<keyof typeof STATES>("idle");

//   const DISABLED_STATES = ["processing", "success", "error"];
//   const isDisabled = DISABLED_STATES.includes(badgeState);

//   const handleSpeaker = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setBadgeState("processing");

//     const res = await fetch("/api/speakers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, bio, image, job }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       //   router.push('/login');
//       console.log("Speaker created:", data);
//       setBadgeState("success");
//       setName("");
//       setBio("");
//       setImage("");
//       setTimeout(() => close(), 3000);
//     } else {
//       setBadgeState("error");
//       //   setError(data.message || 'Something went wrong');
//     }
//   };

//   /**
//    * Use the dialog element's imperative API to open and close the dialog
//    * when the component mounts and unmounts. This enables exit animations
//    * and maintains the dialog's natural accessibility behaviour.
//    */
//   useEffect(() => {
//     if (!ref.current) return;

//     ref.current.showModal();

//     return () => ref.current?.close();
//   }, [ref]);

//   useEffect(() => {
//     // setBadgeState(getNextState(badgeState))
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
//         /**
//          * The onCancel event is triggered when the user
//          * presses the Esc key. We prevent the default and
//          * close the dialog via the provided callback that
//          * first sets React state to false.
//          *
//          * AnimatePresence will take care of our exit animation
//          * before actually closing the dialog.
//          */
//         onCancel={(event) => {
//           event.preventDefault();
//           close();
//         }}
//         /**
//          * However, if the Esc key is pressed twice, the
//          * close method will always fire, and it isn't cancellable.
//          * So we listen for this and make sure the React
//          * state is updated to false.
//          */
//         onClose={close}
//         style={{ transformPerspective: 500 }}
//       >
//         <form onSubmit={handleSpeaker} className="">
//           <h2 className="title">Create a Speaker</h2>
//           {/* <p>Fill all the fields</p> */}
//           <div>
//             {/* <Field>
//           <Label>Email</Label>
//           <Input type="email" name="email" value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="hello@example.com" required />
//         </Field> */}
//             <Field>
//               <Label>Full name</Label>
//               <Input
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="John Doe"
//                 minLength={4}
//                 required
//               />
//             </Field>
//             <Field>
//               <Label>Image Link</Label>
//               <Input
//                 type="url"
//                 name="url"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 required
//               />
//             </Field>
//             <Field>
//               <Label>Bio</Label>
//               <Textarea
//                 name="bio"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 placeholder="A short bio about the speaker"
//                 minLength={10}
//                 required
//               />
//             </Field>
//             <Field>
//               <Label>Job</Label>
//               <Textarea
//                 name="job"
//                 value={job}
//                 onChange={(e) => setJob(e.target.value)}
//                 placeholder="speaker role"
//                 minLength={3}
//                 required
//               />
//             </Field>
//           </div>
//           <div className="controls">
//             <button onClick={close} className="cancel">
//               Cancel
//             </button>
//             <button
//               disabled={isDisabled}
//               className={`transition-opacity ${
//                 isDisabled ? "opacity-60 cursor-not-allowed" : ""
//               } save`}
//               type="submit"
//             >
//               <Badge state={badgeState} />
//             </button>
//           </div>
//         </form>
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
//   ref: React.RefObject<HTMLDialogElement | null>,
//   close: VoidFunction,
// ) {
//   useEffect(() => {
//     const handleClickOutside = (event: React.MouseEvent<Element>) => {
//       if (ref.current && checkClickOutside(event, ref.current)) {
//         close();
//       }
//     };

//     document.addEventListener("click", handleClickOutside as any);

//     return () => {
//       document.removeEventListener("click", handleClickOutside as any);
//     };
//   }, [ref]);
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
//   ref: React.RefObject<HTMLDialogElement | null>;
// }

// /**
//  * ==============   Styles   ================
//  */
// function StyleSheet() {
//   return (
//     <style>{`
//         .openButton, .controls button {
//             background-color: #080808;
//             color: #f5f5f5;
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
//         }

//         .modal {
//             border-radius: 10px;
//             border: 1px solid #212121;
//             background-color: #080808;
//             z-index: 10000000;
//             padding: 20px;
//             min-width: 50%;
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
//         ...styles.badge,
//         gap: state === "idle" ? 0 : 8,
//       }}
//     >
//       <Icon state={state} />
//       <Labela state={state} />
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
//         style={styles.iconContainer}
//         animate={{
//           width: state === "idle" ? 0 : 20,
//         }}
//         transition={SPRING_CONFIG}
//       >
//         <AnimatePresence>
//           <motion.span
//             key={state}
//             style={styles.icon}
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

// const Labela = ({ state }: { state: keyof typeof STATES }) => {
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
//   badge: {
//     backgroundColor: "#ffc300",
//     color: "#080808",
//     fontWeight: 700,
//     display: "flex",
//     overflow: "hidden",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "12px 20px",
//     borderRadius: 999,
//     willChange: "transform, filter",
//   },
//   iconContainer: {
//     height: 20,
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   icon: {
//     position: "absolute",
//     left: 0,
//     top: 0,
//   },
// } as const satisfies Styles;

// /**
//  * ==============   Utils   ================
//  */
// const STATES = {
//   idle: "Create",
//   processing: "Processing",
//   success: "Done",
//   error: "Something went wrong",
// } as const;

// const getNextState = (state: keyof typeof STATES) => {
//   const states = Object.keys(STATES) as (keyof typeof STATES)[];
//   const nextIndex = (states.indexOf(state) + 1) % states.length;
//   return states[nextIndex];
// };

// const SPRING_CONFIG = {
//   type: "spring",
//   stiffness: 600,
//   damping: 30,
// };
