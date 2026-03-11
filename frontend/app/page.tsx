"use client";
import { use, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = emailIsValid && file !== null;

  const [previewUrl, setPreviewUrl] = useState("");


  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md dark:bg-background-dark/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <span className="material-symbols-outlined text-white">
                  dashboard
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Pixel Push
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-primary/10"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/20">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to Pixel Push
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Upload an image and we’ll optimize it (resize, strip metadata, convert to WebP)
            and email you a secure link when it’s ready.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:bg-slate-900">
          <div className="space-y-8 p-6 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">New upload</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This is a single-page MVP UI. Next we’ll wire the inputs and submit logic.
              </p>
            </div>

            {/* Placeholder area where form will go next */}
            <div className="space-y-6">

              {/* Email */}
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="email"
                  >
                    Email Address
                  </label>

                  

                  <div className="relative">

                    <input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      className="w-full rounded-lg border border-transparent bg-background-light py-3 pl-10 pr-4 outline-none transition-all focus:ring-2 focus:ring-primary dark:bg-background-dark"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      
                    />
                  </div>

                  {email.length > 0 && !emailIsValid && (
                    <p className="text-xs text-red-500">
                      Please enter a valid email address.
                    </p>
                  )}

                  {emailIsValid && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We will email you a secure link when processing is complete.
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Image Upload
                  </label>

                  <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 transition-colors hover:bg-primary/10">
                    <div className="flex flex-col items-center justify-center text-center">
                      

                      <p className="font-medium text-slate-900 dark:text-white">
                        Select an image to upload
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        PNG or JPG
                      </p>

                      <div className="mt-4">
                        <input
                          type="file"
                          accept="image/png,image/jpeg"
                          className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-6 file:py-2 file:font-semibold file:text-white hover:file:bg-primary/90"
                          onChange={(e) => {
                            const selected = e.target.files?.[0] ?? null;
                            setFile(selected);

                              if (selected) {
                                const objectUrl = URL.createObjectURL(selected);
                                setPreviewUrl(objectUrl);
                              } else {
                                setPreviewUrl("");
                              }
                          }}
                        />
                      </div>

                      {file && (
                        <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                          Selected: <span className="font-semibold">{file.name}</span>
                        </p>
                      )}

                      {previewUrl && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                            Preview
                          </p>
                          <img
                            src={previewUrl}
                            alt="Selected preview"
                            className="mx-auto max-h-64 rounded-lg border border-primary/10 shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="border-t border-primary/10 pt-4">
                  <button
                    type="button"
                    disabled={!isFormValid}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-12 py-4 font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={async () => {
                      if (!file) return;

                      try {
                        const response = await fetch("/api/create-upload", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            email,
                            filename: file.name,
                            contentType: file.type,
                          }),
                        });

                        const data = await response.json();

                        if(!response.ok) {
                          throw new Error(data.error || "Failed to create upload job");
                        }

                        console.log("Upload Job:", data);

                        //upload file directly to s3

                        const uploadResponse = await fetch(data.uploadUrl,{
                          method: "PUT",
                          headers: {
                            "Content-Type": file.type,
                          },
                          body: file,
                        } );


                        if(!uploadResponse.ok){
                          throw new Error("Upload to S3 Failed");
                        }

                        alert("Upload Succesful");
                      } catch (error) {
                        console.error("Failed to create upload job:", error);
                        alert("Upload failed. Check console.");
                      }
                    }}
                  >
                    <span className="text-base font-bold text-white">Submit</span>
                    <span className="material-symbols-outlined text-white">send</span>
                  </button>
                </div>
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
}