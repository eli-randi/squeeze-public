import Lottie from "lottie-react"
import DashboardLoading from '../../assets/LoadingDashboards.json'
import CompletedAnimation from '../../assets/CompletedAnimation.json'
import { useEffect, useState } from "react";
import './LoadingDashboard.css'
import { Button } from "@mui/material";

const useMountTransition: (isMounted: boolean, unmountDelaty: number) => boolean = (isMounted, unmountDelay) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: any;

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

const loadingText = ['This dashboard will automatically have the main data you may need, but you can also add your own personalised charts', 
                      'Upgrade to the full service to add more than one platform to your dashboard',
                      'Did you know the Squeeze logo started as a PaintMS drawing? (It has been upgraded now, no worries!)',
                      'With the upgraded version of Squeeze you can also add White Labeling to your dashboards, for yourself and your clients']


export const LoadingDashboardCreation: React.FC<{ isLoading: boolean, dashboardUrl: null | string }> = ({ isLoading, dashboardUrl }) => {
  const hasTransitionedLoading = useMountTransition(isLoading, 1000);
  const hasTransitionedCompleted = useMountTransition(!isLoading, 1000);
  const [index, setIndex] = useState(0);

  useEffect(() => {   
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % loadingText.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="LoadingDashboardPage">
      <div className="LoadingComponents">
        {(hasTransitionedLoading || isLoading) && (
          <div
            className={`loading ${hasTransitionedLoading && "in"} ${isLoading && "visible"
              }`}
          >
            <Lottie style={{ height: 300 }} animationData={DashboardLoading} loop={true} />
          </div>
        )}
        {(hasTransitionedCompleted || !isLoading) && (
          <div
            className={`completed ${hasTransitionedCompleted && "in"} ${!isLoading && "visible"
              }`}
          >
            <Lottie style={{ height: 300 }} animationData={CompletedAnimation} loop={false} />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="LoadingTextBox">
          <h2>Please wait, your dashboard is being created...</h2>
          <p className="LoadingText">{loadingText[index]}</p>
          <h3>Do not refresh whilst this page is loading</h3>
      </div>
      )}
      
          <div
            className={`TextCompleted ${hasTransitionedCompleted && "in"} ${!isLoading && "visible"
              }`}
          >
            <h2>Your dashboard has been created</h2>
            <Button onClick={() => dashboardUrl && (window.location.href = dashboardUrl)} variant="contained">Go to dashboard</Button>
          </div>
      
    </div>

  );
}