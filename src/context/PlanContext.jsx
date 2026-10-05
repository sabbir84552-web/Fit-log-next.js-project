'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const isLoaded = useRef(false);

  // LocalStorage theke data load kora (React Compiler safe way)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const localPlan = localStorage.getItem('fitlog_todayPlan');
        const localSaved = localStorage.getItem('fitlog_savedList');
        if (localPlan) setTodayPlan(JSON.parse(localPlan));
        if (localSaved) setSavedList(JSON.parse(localSaved));
      } catch (err) {
        console.error('LocalStorage load error:', err);
      } finally {
        isLoaded.current = true;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // LocalStorage-e data save kora
  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem('fitlog_todayPlan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem('fitlog_savedList', JSON.stringify(savedList));
  }, [savedList]);

  // Today's plan-e add kora (Cap of 5 lifts)
  const addToTodayPlan = (workout) => {
    if (todayPlan.length >= 5) {
      toast.error('Cap reached! You can only add up to 5 lifts for today.');
      return;
    }
    const exists = todayPlan.some((item) => item.id === workout.id);
    if (exists) {
      toast.error("Already added to today's plan!");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan!");
  };

  // Saved list-e add kora
  const addToSaved = (workout) => {
    const exists = savedList.some((item) => item.id === workout.id);
    if (exists) {
      toast.error('Already in saved list!');
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success('Saved for later!');
  };

  // Mark as Done toggle
  const markAsDone = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    toast.success('Workout status updated!');
  };

  // Remove kora
  const removeFromPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan!");
  };

  const removeFromSaved = (id) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from saved list!');
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
        addToTodayPlan,
        addToSaved,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);