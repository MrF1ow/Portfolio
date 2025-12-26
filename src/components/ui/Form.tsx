import DivideLayout from "@/components/layouts/Divide";

export const ContactForm = () => {
  return (
    <div className="d-card bg-base-100/25 w-full">
      <div className="d-card-body">
        <fieldset className="d-fieldset space-y-4">
          <DivideLayout direction="horizontal" width="w-full">
            <div className="flex flex-col gap-1 w-full">
              <label className="d-label text-warning">Name</label>
              <input type="text" className="d-input w-full" placeholder="Enter Name" />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="d-label text-warning">Email</label>
              <input
                type="email"
                className="d-input w-full"
                placeholder="Enter Email"
              />
            </div>
          </DivideLayout>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="d-label text-warning">Message</label>
            <textarea
              className="d-textarea w-full h-40 resize-none"
              placeholder="Message to send me"
            />
          </div>

          <button className="d-btn d-btn-warning mt-4">Send</button>
        </fieldset>
      </div>
    </div>
  );
};
