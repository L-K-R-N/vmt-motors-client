import {
   setShowFooter,
   setShowHeader,
   setShowSidebar,
} from '@/store/reducers/LayoutSlice';
import { useEffect, useLayoutEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';

export const useShowHeader = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(false));
      dispatch(setShowHeader(true));
      dispatch(setShowSidebar(false));
   }, []);
};

export const useShowSidebar = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(false));
      dispatch(setShowHeader(false));
      dispatch(setShowSidebar(true));
   }, []);
};

export const useShowFooter = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(true));
      dispatch(setShowHeader(false));
      dispatch(setShowSidebar(false));
   }, []);
};

export const useHideHeader = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(true));
      dispatch(setShowHeader(false));
      dispatch(setShowSidebar(true));
   }, []);
};

export const useHideSidebar = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setShowFooter(true));
      dispatch(setShowHeader(true));
      dispatch(setShowSidebar(false));
      console.log();
   }, []);
};

export const useHideFooter = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(false));
      dispatch(setShowHeader(true));
      dispatch(setShowSidebar(true));
   }, []);
};

export const useShowLayout = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(true));
      dispatch(setShowHeader(true));
      dispatch(setShowSidebar(true));
   }, []);
};

export const useHideLayout = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(setShowFooter(false));
      dispatch(setShowHeader(false));
      dispatch(setShowSidebar(false));
   }, []);
};
