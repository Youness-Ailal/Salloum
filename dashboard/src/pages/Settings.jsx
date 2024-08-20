import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <div>
      <Heading as="h1">Website layout</Heading>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
