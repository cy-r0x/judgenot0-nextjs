import ProblemEditComponent from "@/components/ProblemEditComponent/ProblemEditComponent";

export default ({ params }) => {
  return (
    <div className="my-4">
      <ProblemEditComponent params={params} />
    </div>
  );
};
