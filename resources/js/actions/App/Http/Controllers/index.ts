import OnboardingController from './OnboardingController';
import AiAgentController from './AiAgentController';
import Settings from './Settings';
const Controllers = {
    OnboardingController: Object.assign(
        OnboardingController,
        OnboardingController,
    ),
    AiAgentController: Object.assign(AiAgentController, AiAgentController),
    Settings: Object.assign(Settings, Settings),
};

export default Controllers;
