// src/components/wave-section
import './styles.scss';

interface WaveSectionProps {
    children: React.ReactNode;
  }

  function WaveSection({ children }: WaveSectionProps) {
    return (
        <div className="component wave-section-component">
            <div className="wave-wrapper">

                <div className="wave-top">
                    <div className="wave-top-container">
                        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="wave-svg transition duration-300 ease-in-out delay-150"><path d="M 0,400 L 0,150 C 100.59330143540669,168.56459330143542 201.18660287081337,187.12918660287082 296,194 C 390.8133971291866,200.87081339712918 479.8468899521532,196.04784688995215 575,181 C 670.1531100478468,165.95215311004785 771.425837320574,140.6794258373206 879,125 C 986.574162679426,109.32057416267942 1100.4497607655503,103.23444976076556 1195,109 C 1289.5502392344497,114.76555023923444 1364.7751196172248,132.38277511961724 1440,150 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill-opacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                    </div>
                </div>

                <div className="wave-content">
                    {/* Load in content all: */}
                    {children}
                </div>


                <div className="wave-bottom">
                    <div className="wave-bottom-container">
                        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="wave-svg transition duration-300 ease-in-out delay-150"><path d="M 0,400 L 0,150 C 83.11961722488039,179.6267942583732 166.23923444976077,209.25358851674642 264,212 C 361.7607655502392,214.74641148325358 474.1626794258374,190.61244019138758 574,162 C 673.8373205741626,133.38755980861242 761.1100478468899,100.29665071770334 851,94 C 940.8899521531101,87.70334928229666 1033.397129186603,108.20095693779905 1132,122 C 1230.602870813397,135.79904306220095 1335.3014354066986,142.89952153110048 1440,150 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill-opacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaveSection;