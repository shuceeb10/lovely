import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Edit2, Check, Calendar, RotateCcw } from 'lucide-react';
import { getSetting, saveSetting } from '../utils/db';

type MilestoneKey = 'first_meeting' | 'anniversary' | 'special_date';

interface Milestone {
  id: MilestoneKey;
  label: string;
  defaultDate: string; // ISO string
}

export default function CountdownSection() {
  const milestones: Milestone[] = [
    { id: 'first_meeting', label: 'First Meeting Date', defaultDate: '2024-04-12T14:30:00' },
    { id: 'anniversary', label: 'Our Anniversary Date', defaultDate: '2025-05-20T18:00:00' },
    { id: 'special_date', label: 'Next Special Date', defaultDate: '2026-12-25T00:00:00' },
  ];

  const [activeMilestoneId, setActiveMilestoneId] = useState<MilestoneKey>('first_meeting');
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempDateStr, setTempDateStr] = useState('');

  // Live calculated state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  // Load date from IndexedDB or fallback
  useEffect(() => {
    async function loadDate() {
      const stored = await getSetting<string>(`date_${activeMilestoneId}`);
      const fallback = milestones.find((m) => m.id === activeMilestoneId)?.defaultDate || '';
      const dateVal = stored || fallback;
      setSelectedDateStr(dateVal);
      setTempDateStr(dateVal.slice(0, 16)); // YYYY-MM-DDTHH:mm format for datetime-local
    }
    loadDate();
  }, [activeMilestoneId]);

  // Handle Save Edited Date
  const handleSaveDate = async () => {
    const formatted = new Date(tempDateStr).toISOString();
    await saveSetting(`date_${activeMilestoneId}`, formatted);
    setSelectedDateStr(formatted);
    setIsEditing(false);
  };

  // Reset to default date
  const handleResetDefault = async () => {
    const fallback = milestones.find((m) => m.id === activeMilestoneId)?.defaultDate || '';
    await saveSetting(`date_${activeMilestoneId}`, fallback);
    setSelectedDateStr(fallback);
    setTempDateStr(fallback.slice(0, 16));
    setIsEditing(false);
  };

  // Live Timer Interval
  useEffect(() => {
    if (!selectedDateStr) return;

    const calculateTime = () => {
      const targetTime = new Date(selectedDateStr).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      const isPastVal = diff < 0;
      const absDiff = Math.abs(diff);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: isPastVal });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedDateStr]);

  const activeMilestone = milestones.find((m) => m.id === activeMilestoneId);

  return (
    <section
      id="countdown-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950/40"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Title Group */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Every Second Matters ❤️
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-rose-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto font-sans">
            Tracking our beautiful timeline of love and special days.
          </p>
        </div>

        {/* Milestone Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-2xl mx-auto rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
          {milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveMilestoneId(m.id);
                setIsEditing(false);
              }}
              className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeMilestoneId === m.id
                  ? 'bg-gradient-to-r from-rose-500/95 to-pink-500/95 text-white shadow-md'
                  : 'text-rose-100/50 hover:text-rose-100/80 hover:bg-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Main Countdown Frame */}
        <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900/40 to-slate-950/80 border border-rose-500/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center space-y-8">
          
          {/* Headline showing direction (Time Since vs Time Until) */}
          <div className="text-center space-y-1">
            <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">
              {timeLeft.isPast ? 'TIME ELAPSED SINCE' : 'COUNTDOWN TO'}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
              {activeMilestone?.label}
            </h3>
            <p className="text-xs text-rose-300/40">
              {selectedDateStr && new Date(selectedDateStr).toLocaleString(undefined, {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </p>
          </div>

          {/* Time Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-2xl bg-slate-950 border border-white/5 p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-inner"
              >
                {/* Glowing bottom line */}
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-rose-500/50 via-pink-500/50 to-purple-500/50" />
                
                {/* Number (with transition state key to animate change nicely) */}
                <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-rose-200 tracking-tight font-sans">
                  {card.value.toString().padStart(2, '0')}
                </span>
                
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-rose-400/50 mt-2 font-medium">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Editable Date Interface */}
          <div className="w-full pt-4 flex flex-col items-center border-t border-rose-500/5">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400/60 hover:text-rose-300 transition-colors cursor-pointer p-2 rounded-lg hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10"
                >
                  <Edit2 size={12} />
                  CHANGE MILESTONE DATE
                </motion.button>
              ) : (
                <motion.div
                  key="editing-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex flex-col sm:flex-row items-center gap-3 max-w-md"
                >
                  <div className="relative flex-grow w-full">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/50" />
                    <input
                      type="datetime-local"
                      value={tempDateStr}
                      onChange={(e) => setTempDateStr(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-rose-500/20 text-white text-sm outline-none focus:border-rose-500 transition-all font-mono"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleSaveDate}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white text-xs font-semibold cursor-pointer transition-all border border-white/5"
                    >
                      <Check size={12} />
                      Save
                    </button>
                    <button
                      onClick={handleResetDefault}
                      className="flex items-center justify-center p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 hover:text-rose-300 border border-white/5 transition-all cursor-pointer"
                      title="Reset to Default"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-rose-400 hover:text-rose-300 border border-rose-500/10 hover:border-rose-500/20 text-xs font-semibold cursor-pointer transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
