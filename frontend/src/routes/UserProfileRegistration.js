import { Box } from "@material-ui/core";
import { useLocation } from "react-router";
import CoachRegistration from "./modules/coach.registration";
import GovernmentAgencyRegistration from "./modules/gov.registration";
import HubRegistration from "./modules/hub.registration";
import IncubateRegistration from "./modules/incubate.registration";
import InvestorRegistration from "./modules/inv.registration";
import MentorRegistration from "./modules/mentor.registration";

export default function UserProfileRegistration() {
  const loc = useLocation();
  const { role } = loc.state || {};
  console.log("Role: ", role, loc);

  function getForm() {
    switch (role) {
      case "Incubatee":
        return <IncubateRegistration />;
      case "Hub Manager":
        return <HubRegistration />;
      case "Investor":
        return <InvestorRegistration />;
      case "Government Agency":
        return <GovernmentAgencyRegistration />;
      case "Coach":
        return <CoachRegistration />;
      case "Mentor":
        return <MentorRegistration />;
      default:
        return <Box>Role not supported yet: {role}</Box>;
    }
  }

  const form = getForm();

  return <>{form}</>;
}
