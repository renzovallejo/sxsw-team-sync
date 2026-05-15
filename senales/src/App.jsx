import React, { useState, useEffect } from 'react';
import { ACCENTS, TYPE_SYSTEMS, SAMPLE_SIGNALS } from './tokens.js';
import { IOSStatusBar } from './components/IOSFrame.jsx';
import OnboardingScreen from './screens/ScreenOnboarding.jsx';
import HomeScreen, { TabBar, CaptureSheet } from './screens/ScreenHome.jsx';
import CameraScreen from './screens/ScreenCamera.jsx';
import VoiceScreen from './screens/ScreenVoice.jsx';
import TextCaptureScreen from './screens/ScreenText.jsx';
import ProcessingScreen from './screens/ScreenProcessing.jsx';
import InsightEditorial from './screens/ScreenInsight.jsx';
import DetailScreen from './screens/ScreenDetail.jsx';
import FeedScreen from './screens/ScreenFeed.jsx';
import PublishScreen from './screens/ScreenPublish.jsx';
import SocialScreen from './screens/ScreenSocial.jsx';
import FuturosScreen from './screens/ScreenFuturos.jsx';
import NotificationsScreen from './screens/ScreenNotifications.jsx';
import ProfileScreen from './screens/ScreenProfile.jsx';

const ACCENT = ACCENTS.tinta;
const TYPE_SYS = TYPE_SYSTEMS.editorial;

function usePhoneScale(W, H) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function calc() {
      const sw = (window.innerWidth - 40) / W;
      const sh = (window.innerHeight - 40) / H;
      setScale(Math.min(1, sw, sh));
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [W, H]);
  return scale;
}

export default function App() {
  const W = 390, H = 844;
  const scale = usePhoneScale(W, H);

  const [history, setHistory] = useState(['onboarding']);
  const [dir, setDir] = useState('in');
  const [activeSignal, setActiveSignal] = useState(SAMPLE_SIGNALS[0]);
  const [showSheet, setShowSheet] = useState(false);
  const [captureMode, setCaptureMode] = useState('photo');

  const stage = history[history.length - 1];

  function push(next)    { setDir('push');    setHistory(h => [...h, next]); }
  function pop()         { if (history.length > 1) { setDir('pop'); setHistory(h => h.slice(0, -1)); } }
  function replace(next) { setDir('in');      setHistory(h => [...h.slice(0, -1), next]); }
  function goRoot(tab)   { setDir('in');      setHistory([tab]); }

  const tabActive =
      ['home','feed'].includes(stage) ? 'home'
    : stage === 'social'  ? 'social'
    : stage === 'futuros' ? 'futuros'
    : stage === 'profile' ? 'profile'
    : null;

  function withTabBar(screen) {
    return (
      <>
        {screen}
        <TabBar active={tabActive} onTab={goRoot} onCaptureSheet={() => setShowSheet(true)} accent={ACCENT} typeSys={TYPE_SYS}/>
        {showSheet && (
          <CaptureSheet accent={ACCENT} typeSys={TYPE_SYS}
            onPick={(m) => { setShowSheet(false); setCaptureMode(m); push('camera'); }}
            onClose={() => { setShowSheet(false); setCaptureMode('photo'); }}/>
        )}
      </>
    );
  }

  function renderStage() {
    switch (stage) {
      case 'onboarding': return <OnboardingScreen accent={ACCENT} typeSys={TYPE_SYS} onDone={() => replace('home')}/>;
      case 'home': return withTabBar(<HomeScreen signals={SAMPLE_SIGNALS} accent={ACCENT} typeSys={TYPE_SYS} onCapture={(m) => { setCaptureMode(m); push('camera'); }} onOpenSignal={(s) => { setActiveSignal(s); push('detail'); }} onOpenFeed={() => push('feed')} onOpenMap={() => push('feed')} onOpenNotifications={() => push('notifications')}/>);
      case 'camera':
        if (captureMode === 'voice') return <VoiceScreen accent={ACCENT} typeSys={TYPE_SYS} onCapture={() => replace('processing')} onBack={pop}/>;
        if (captureMode === 'text') return <TextCaptureScreen accent={ACCENT} typeSys={TYPE_SYS} onCapture={() => replace('processing')} onBack={pop}/>;
        return <CameraScreen accent={ACCENT} typeSys={TYPE_SYS} onCapture={() => replace('processing')} onBack={pop}/>;
      case 'processing': return <ProcessingScreen accent={ACCENT} typeSys={TYPE_SYS} onDone={() => replace('insight')}/>;
      case 'insight': return <InsightEditorial signal={activeSignal} accent={ACCENT} typeSys={TYPE_SYS} onOpen={() => push('publish')} onNewSignal={() => replace('camera')}/>;
      case 'publish': return <PublishScreen signal={activeSignal} accent={ACCENT} typeSys={TYPE_SYS} onBack={pop} onPublish={() => goRoot('feed')}/>;
      case 'feed': return withTabBar(<FeedScreen signals={SAMPLE_SIGNALS} accent={ACCENT} typeSys={TYPE_SYS} onOpen={(s) => { setActiveSignal(s); push('detail'); }} onCapture={() => setShowSheet(true)}/>);
      case 'detail': return <DetailScreen signal={activeSignal} accent={ACCENT} typeSys={TYPE_SYS} onBack={pop} onOpen={(s) => setActiveSignal(s)}/>;
      case 'social': return withTabBar(<SocialScreen signals={SAMPLE_SIGNALS} accent={ACCENT} typeSys={TYPE_SYS} onOpen={(s) => { setActiveSignal(s); push('detail'); }}/>);
      case 'futuros': return withTabBar(<FuturosScreen signals={SAMPLE_SIGNALS} accent={ACCENT} typeSys={TYPE_SYS} onOpenSignal={(s) => { setActiveSignal(s); push('detail'); }}/>);
      case 'notifications': return <NotificationsScreen accent={ACCENT} typeSys={TYPE_SYS} onBack={pop} onOpenSignal={() => { setActiveSignal(SAMPLE_SIGNALS[0]); push('detail'); }} onOpenFuturos={() => replace('futuros')} onOpenProfile={() => replace('profile')}/>;
      case 'profile': return withTabBar(<ProfileScreen signals={SAMPLE_SIGNALS} accent={ACCENT} typeSys={TYPE_SYS} onOpen={(s) => { setActiveSignal(s); push('detail'); }}/>);
      default: return null;
    }
  }

  const animClass = dir === 'push' ? 'screen-push' : dir === 'pop' ? 'screen-pop' : 'screen-in';

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0e0c0b' }}>
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(31,58,138,0.2) 0%, transparent 70%)' }}/>
      <div className={`phone-shell`} style={{ width:W, height:H, borderRadius:48, overflow:'hidden', position:'relative', background:'#F2F2F7', boxShadow:'0 48px 96px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)', transform:`scale(${scale})`, transformOrigin:'center center', WebkitFontSmoothing:'antialiased' }}>
        <div style={{ position:'absolute', top:11, left:'50%', transform:'translateX(-50%)', width:126, height:37, borderRadius:24, background:'#000', zIndex:50, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:40, pointerEvents:'none' }}><IOSStatusBar dark={false}/></div>
        <div key={stage} className={animClass} style={{ position:'absolute', inset:0, overflow:'hidden' }}>{renderStage()}</div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:34, display:'flex', justifyContent:'center', alignItems:'flex-end', paddingBottom:8, zIndex:60, pointerEvents:'none' }}>
          <div style={{ width:139, height:5, borderRadius:100, background:'rgba(0,0,0,0.22)' }}/>
        </div>
      </div>
    </div>
  );
}
