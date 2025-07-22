import { Advocate } from "@/app/types/advocates";
import AdvocatesTableHeader from "./AdvocatesTableHeader";
import AdvocatesTableRow from "./AdvocatesTableRow";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({advocates}: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <AdvocatesTableHeader />
        <tbody>
          {advocates.map((advocate: Advocate, index: number) => (
            <AdvocatesTableRow key={`advocate-${index}`} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}