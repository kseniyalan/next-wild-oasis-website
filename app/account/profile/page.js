import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Update profile",
};

export default function Page() {
  // CHANGE
  //const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* UpdateProfileForm is a Client component and it tries to render a SelectCountry component */}
      {/* SelectCountry is a Server component because it needs to fetch data from the server */}
      {/* By default a component rendered inside a client component will also be a client component */}
      {/* Here we provide SelectCountry as a children prop to UpdateProfileForm */}
      {/* This way, SelectCountry will be rendered as a server component */}
      {/* This is a good way to mix server and client components */}
      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
