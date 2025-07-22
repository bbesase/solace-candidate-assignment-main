import { Advocate } from "../../../types/advocates";
import {AdvocatesTableSpecialtiesDesktop} from "./index";

interface TableRowProps {
  advocate: Advocate;
}

export default function AdvocatesTableRowDesktop({ advocate }: TableRowProps) {
  return (
    <tr className="hover:bg-sky-100">
      <td className="border border-gray-300 px-4 py-2">{advocate.firstName}</td>
      <td className="border border-gray-300 px-4 py-2">{advocate.lastName}</td>
      <td className="border border-gray-300 px-4 py-2">{advocate.city}</td>
      <td className="border border-gray-300 px-4 py-2">{advocate.degree}</td>
      <td className="border border-gray-300 px-4 py-2">
        <AdvocatesTableSpecialtiesDesktop specialties={advocate.specialties} />
      </td>
      <td className="border border-gray-300 px-4 py-2">{advocate.yearsOfExperience}</td>
      <td className="border border-gray-300 px-4 py-2">{advocate.phoneNumber}</td>
    </tr>
  );
}