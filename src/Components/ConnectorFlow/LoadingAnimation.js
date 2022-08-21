import Lottie from "lottie-react"
import DashboardLoading from '../../assets/LoadingDashboards.json'
import CompletedAnimation from '../../assets/CompletedAnimation.json'
import { useEffect, useState } from "react";
import './LoadingAnimation.css'

const useMountTransition = (isMounted, unmountDelay) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};


export const LoadingAnimation = ({isLoading}) => {
  const hasTransitionedLoading = useMountTransition(isLoading, 1000);
  const [isCompleted, setIsCompleted] = useState(false);
  const hasTransitionedCompleted = useMountTransition(!isLoading, 1000)

  useEffect(() => {
  }, [])

  return (
    <div className="LoadingComponents">
        {(hasTransitionedLoading || isLoading) && (
          <div
            className={`loading ${hasTransitionedLoading && "in"} ${
              isLoading && "visible"
            }`}
          >
            <Lottie style={{ height: 300 }} animationData={DashboardLoading} loop={true} />
          </div>
        )}
        {(hasTransitionedCompleted || !isLoading) && (
          <div
            className={`completed ${hasTransitionedCompleted && "in"} ${
              !isLoading && "visible"
            }`}
          >
            <Lottie style={{ height: 300 }} animationData={CompletedAnimation} loop={false} />
          </div>
        )}
    </div>
  );
}