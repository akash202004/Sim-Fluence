"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define types based on Prisma schema
type Platform = "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "LINKEDIN";
type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

interface SimulationData {
  title: string;
  content: string;
  platform: Platform;
  files: File[];
}

interface SimulationResult {
  id: string;
  title: string;
  content: string;
  status: Status;
  platform: Platform;
  impressions: number;
  likesEstimate: number;
  commentsEstimate: number;
  createdAt: string;
  agentReactions: {
    agentName: string;
    action: string;
    reason: string;
    sentiment: string;
  }[];
  summary?: {
    summaryText: string;
    toneCloud: any;
    toneBreakdown: any;
    sectionFeedback: any;
    engagementData: any;
    audienceMatch: string;
    feedbackScore: number;
  };
  postSuggestions: {
    id: string;
    suggestionText: string;
    applied: boolean;
  }[];
}

export function SimulationSection() {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    title: "",
    content: "",
    platform: "INSTAGRAM",
    files: [],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [pastSimulations, setPastSimulations] = useState<SimulationResult[]>([]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSimulationData({
      ...simulationData,
      content: e.target.value,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimulationData({
      ...simulationData,
      title: e.target.value,
    });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSimulationData({
      ...simulationData,
      platform: e.target.value as Platform,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Limit file size to prevent memory issues (10MB limit)
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== newFiles.length) {
        // Optional: Add error handling for files that are too large
        console.warn("Some files were too large and were not added");
      }
      
      setSimulationData({
        ...simulationData,
        files: [...simulationData.files, ...validFiles],
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setSimulationData({
      ...simulationData,
      files: simulationData.files.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate API call for analysis
    setTimeout(() => {
      const mockResult: SimulationResult = {
        id: Math.random().toString(36).substring(2, 9),
        title: simulationData.title,
        content: simulationData.content,
        status: "COMPLETED",
        platform: simulationData.platform,
        impressions: Math.floor(Math.random() * 10000),
        likesEstimate: Math.floor(Math.random() * 1000),
        commentsEstimate: Math.floor(Math.random() * 200),
        createdAt: new Date().toISOString(),
        agentReactions: [
          {
            agentName: "Young Professional",
            action: "Like",
            reason: "Relevant content for my interests",
            sentiment: "positive",
          },
          {
            agentName: "Parent",
            action: "Comment",
            reason: "Found this informative",
            sentiment: "neutral",
          },
        ],
        summary: {
          summaryText: "This post is likely to perform well with your target audience.",
          toneCloud: { positive: 70, neutral: 20, negative: 10 },
          toneBreakdown: { informative: 60, engaging: 30, promotional: 10 },
          sectionFeedback: { intro: "Strong", body: "Good", conclusion: "Effective" },
          engagementData: { impressions: 8500, likes: 750, comments: 120 },
          audienceMatch: "High",
          feedbackScore: 8,
        },
        postSuggestions: [
          {
            id: "sugg1",
            suggestionText: "Add more hashtags to increase reach",
            applied: false,
          },
          {
            id: "sugg2",
            suggestionText: "Include a call to action at the end",
            applied: false,
          },
        ],
      };

      setSimulationResults(mockResult);
      setPastSimulations(prev => [mockResult, ...prev]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
        Content Simulation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Simulation Section */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Create New Simulation
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-white"
                placeholder="Post title"
                value={simulationData.title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-white"
                rows={4}
                placeholder="Write your post content here..."
                value={simulationData.content}
                onChange={handleContentChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Platform
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-white"
                value={simulationData.platform}
                onChange={handlePlatformChange}
                required
              >
                <option value="INSTAGRAM">Instagram</option>
                <option value="FACEBOOK">Facebook</option>
                <option value="TWITTER">Twitter</option>
                <option value="LINKEDIN">LinkedIn</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Upload Media
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,video/*"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Select Files
                </label>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop files or click to browse
                </p>
              </div>

              {simulationData.files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {simulationData.files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
                        {file.type.startsWith("image/") ? (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            fill
                            className="object-cover"
                            unoptimized // Add this to prevent optimization issues with blob URLs
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">Video</span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !simulationData.title || !simulationData.content}
              className={cn(
                "w-full py-2 px-4 rounded-md text-white font-medium",
                isAnalyzing || !simulationData.title || !simulationData.content
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {isAnalyzing ? "Analyzing..." : "Run Simulation"}
            </button>
          </form>
        </div>

        {/* Simulation Results Section */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Simulation Results
          </h2>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Running simulation...
              </p>
            </div>
          ) : simulationResults ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Engagement Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Impressions</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{simulationResults.impressions.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{simulationResults.likesEstimate.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{simulationResults.commentsEstimate.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {simulationResults.summary && (
                <>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Summary
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {simulationResults.summary.summaryText}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Audience Match
                    </h3>
                    <p className={cn(
                      "mt-2 inline-block px-3 py-1 rounded-full text-sm",
                      simulationResults.summary.audienceMatch === "High" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                      simulationResults.summary.audienceMatch === "Low" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    )}>
                      {simulationResults.summary.audienceMatch}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Feedback Score
                    </h3>
                    <div className="flex items-center mt-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-6 h-6 rounded-full mx-1",
                            i < Math.floor(simulationResults.summary?.feedbackScore || 0)
                              ? "bg-blue-500"
                              : "bg-gray-300 dark:bg-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {simulationResults.summary.feedbackScore}/10
                    </p>
                  </div>
                </>
              )}

              {simulationResults.postSuggestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Improvement Suggestions
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {simulationResults.postSuggestions.map((suggestion) => (
                      <li key={suggestion.id} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{suggestion.suggestionText}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Run a simulation to see results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Past Simulations Section */}
      <div className="mt-12 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
          Past Simulations
        </h2>

        {pastSimulations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Impressions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-gray-800">
                {pastSimulations.map((simulation) => (
                  <tr key={simulation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(simulation.createdAt).toLocaleDateString('en-US')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <div className="truncate max-w-xs">
                        {simulation.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {simulation.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        simulation.status === "COMPLETED" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        simulation.status === "FAILED" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                        simulation.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      )}>
                        {simulation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {simulation.impressions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No past simulations found. Run your first simulation to see results here.
          </div>
        )}
      </div>
    </div>
  );
}
