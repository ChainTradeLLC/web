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
// // import { Field, Label } from '@/components/ui/fieldset'
// // import { Input } from '@/components/ui/input'
// // import { Textarea } from '@/components/ui/textarea'
// import {
//   Input,
//   Textarea,
//   Button,
//   Select,
//   SelectItem,
//   useDisclosure,
// } from "@nextui-org/react";

// export default function EventModal() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 1.05 }}
//         className="openButtonn"
//         onClick={() => setIsOpen(true)}
//         data-primary-action
//       >
//         Create Event
//       </motion.button>
//       <AnimatePresence>
//         {isOpen ? <Dialog close={() => setIsOpen(false)} /> : null}
//       </AnimatePresence>
//       <StyleSheet />
//     </>
//   );
// }

// function Dialog({ close }: { close: () => void }) {
//   const reff = useRef<HTMLDialogElement>(null);
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [speakerIds, setSpeakerIds] = useState<string[]>([]);
//   const [speakers, setSpeakers] = useState<any[]>([]);
//   const [badgeState, setBadgeState] = useState<keyof typeof STATES>("idle");
//   const [error, setError] = useState("");
//   const [fetchError, setFetchError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   const DISABLED_STATES = ["processing", "success", "error"];
//   const isDisabled = DISABLED_STATES.includes(badgeState);

//   useEffect(() => {
//     // if (isOpen) {
//     //     console.log('Dialog closed, skipping fetch');
//     //     return;
//     //   }

//     async function fetchSpeakers() {
//       console.log("Fetching speakers...");
//       setFetchError("");
//       setSpeakers([]);
//       try {
//         const res = await fetch("/api/speakers", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         console.log("Fetch response status:", res.status);

//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log("Fetch response data:", data);

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid response format: Expected an array");
//         }

//         setSpeakers(data);
//         console.log("Speakers state updated:", data);
//       } catch (err: any) {
//         console.error("Fetch speakers error:", err);
//         setFetchError(`Failed to load speakers: ${err.message}`);
//       }
//     }
//     fetchSpeakers();
//   }, [onOpen]);

//   useEffect(() => {
//     console.log("Speakers state:", speakers);
//   }, [speakers]);

//   const handleEvent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(
//       "form state:",
//       title,
//       description,
//       image,
//       date,
//       location,
//       speakerIds,
//     );
//     setBadgeState("processing");

//     const res = await fetch("/api/events", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         description,
//         image,
//         date,
//         location,
//         speakerIds,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       console.log("Event created:", data);
//       setBadgeState("success");
//       setTimeout(() => close(), 3000);
//     } else {
//       setBadgeState("error");
//     }
//   };

//   /**
//    * Use the dialog element's imperative API to open and close the dialog
//    * when the component mounts and unmounts. This enables exit animations
//    * and maintains the dialog's natural accessibility behaviour.
//    */
//   useEffect(() => {
//     if (!reff.current) return;

//     reff.current.showModal();

//     return () => reff.current?.close();
//   }, [reff]);

//   useEffect(() => {
//     if (!reff.current) return;

//     console.log("Dialog mounted", speakers);
//   }, []);

//   useClickOutside(reff, close);

//   const handleSpeakerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map(
//       (option) => option.value,
//     );
//     console.log("Raw selected options:", selectedOptions);
//     setSpeakerIds(selectedOptions.filter(Boolean));
//     console.log("Updated speakerIds:", selectedOptions.filter(Boolean));
//   };

//   return (
//     <>
//       <motion.div
//         className="overlayy"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       ></motion.div>
//       <motion.dialog
//         initial={dialogInitialState}
//         animate={dialogOpenState}
//         exit={dialogInitialState}
//         ref={reff}
//         className="modall fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
//         {speakers.length >= 0 && (
//           <form onSubmit={handleEvent} className="">
//             <h2 className="title">Create an Event</h2>
//             {/* <p>Fill all the fields</p> */}
//             <div>
//               <Input
//                 label="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder=""
//                 required
//                 className="text-white mb-2"
//                 classNames={{
//                   input: "text-white placeholder:text-gray-400",
//                   innerWrapper: "bg-gray-800",
//                   inputWrapper: "bg-gray-800 border-gray-600",
//                 }}
//               />
//               <Input
//                 label="Image"
//                 value={image}
//                 type="url"
//                 onChange={(e) => setImage(e.target.value)}
//                 placeholder=""
//                 required
//                 className="text-white mb-2"
//                 classNames={{
//                   input: "text-white placeholder:text-gray-400",
//                   innerWrapper: "bg-gray-800",
//                   inputWrapper: "bg-gray-800 border-gray-600",
//                 }}
//               />
//               <Textarea
//                 label="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder=""
//                 className="text-white mb-2"
//                 classNames={{
//                   input: "text-white placeholder:text-gray-400",
//                   innerWrapper: "bg-gray-800",
//                   inputWrapper: "bg-gray-800 border-gray-600",
//                 }}
//               />
//               <Input
//                 label="Date"
//                 type="datetime-local"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 className="text-white mb-2"
//                 classNames={{
//                   input: "text-white placeholder:text-gray-400",
//                   innerWrapper: "bg-gray-800",
//                   inputWrapper: "bg-gray-800 border-gray-600",
//                 }}
//               />
//               <Input
//                 label="Location"
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder=""
//                 className="text-white mb-2"
//                 classNames={{
//                   input: "text-white placeholder:text-gray-400",
//                   innerWrapper: "bg-gray-800",
//                   inputWrapper: "bg-gray-800 border-gray-600",
//                 }}
//               />
//               <div className="space-y-2">
//                 <label
//                   htmlFor="speakers"
//                   className="block text-sm font-medium text-white"
//                 >
//                   Speakers
//                 </label>
//                 <select
//                   id="speakers"
//                   multiple={true}
//                   value={speakerIds}
//                   onChange={(e) => handleSpeakerSelect(e)}
//                   className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {speakers.length === 0 ? (
//                     <option disabled value="">
//                       No speakers available
//                     </option>
//                   ) : (
//                     speakers.map((speaker) => (
//                       <option key={speaker.id} value={speaker.id}>
//                         {speaker.name}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>
//               {speakers.length === 0 && !fetchError && (
//                 <p className="text-yellow-500">
//                   No speakers found.{" "}
//                   {/* <Link href="/admin/speakers/new" className="text-blue-500" onClick={handleModalClose}>
//                           Create a speaker
//                         </Link> */}
//                 </p>
//               )}
//               {fetchError && <p className="text-red-500">{fetchError}</p>}
//             </div>
//             <div className="controlss">
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
//         )}
//         <button className="closeButtonn" aria-label="Close" onClick={close}>
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
//         .openButtonn, .controlss button {
//         background-color: #ffc300;
//             color: #080808;
//             font-size: 16px;
//             font-weight: 700;
//             padding: 10px 20px;
//             border-radius: 10px;
//         }

//         .controlss {
//             border-top: 1px solid var(--divider);
//             padding-top: 20px;
//             margin-top: 20px;
//             display: flex;
//             justify-content: flex-end;
//             gap: 10px;
//         }

//         .controlss button.cancel {
//             background-color: var(--divider);
//             color: #f5f5f5;
//         }

//         .controlss button.save {
//             width: max-content;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//         }

//         .modall {
//             border-radius: 10px;
//             border: 1px solid #212121;
//             background-color: #080808;
//             z-index: 10000000;
//             padding: 20px;
//             min-width: 50%;
//         }

//         .modall p {
//             margin: 0;
//             color: #f5f5f5;
//         }

//         .modall::backdrop {
//             display: none;
//         }

//         .title {
//             font-size: 24px;
//             margin: 0 0 20px;
//         }

//         .closeButtonn {
//             position: absolute;
//             top: 20px;
//             right: 20px;
//             color: #f5f5f5;
//         }

//         .overlayy {
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
//       <Icon state={state} />
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
