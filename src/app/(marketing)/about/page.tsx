import React from 'react';
import VisionMissionSection from '@/components/VisionMissionSection';
import BoardMembersSection from '@/components/BoardMembersSection';
import AboutSection from '@/components/AboutSection';
import SidebarNavigation from '@/components/SidebarNavigation';

export default function AboutPage() {
  const boardMembers = [
    {
      name: "Mr. Chim Guanghui",
      position: "Chairman",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/bp6ijg07nhxhrmlh0yabt/Mr.-Chim-Guanghui.png?rlkey=mv9of8fg66gwrvvb36k5b3gpp&st=t4x7qfn8&dl=1"
    },
    {
      name: "Mr. Hin Sopheap",
      position: "Executive Director Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/bjlmzwljrjh1layzn93ls/Mr.-Hin-Sopheap.png?rlkey=4v6ol1lxxzb37e9msxlvcahqq&st=gjfas1e4&dl=1"
    },
    {
      name: "Ms. Khov Manil",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/uxnjqt8dxfcok616ko1oe/Ms.-Khov-Manil.jpg?rlkey=q97la21wjchtc1eq7lio9l4e8&st=5qspoq1q&dl=1"
    },
    {
      name: "Dr. Siem Monileak",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/d32chy2q3r0r7b78c53kt/Dr.-Siem-Monileak.jpg?rlkey=yrq9vzibh1w3s6g778cugbv1n&st=3lv0yjjc&dl=1"
    },
    {
      name: "Dr. Somboon Mongkolsombat",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/twdax8ofz5u0qc7joznqx/Dr.-Somboon-Mongkolsombat.png?rlkey=15rgd7j07a7clljk594lu9hku&st=8sgx34s2&dl=1"
    },
    {
      name: "Mr. Ngeth Chou",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/xt3izwfl5mjalywz9rdqb/Mr-.Ngeth-chou.png?rlkey=5f7009r21y7bj13as0m9t5404&st=pdhb36av&dl=1"
    },
    {
      name: "Mr. Ros Sokha",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/eamj75jo9hhe9ybc85iwt/Mr.-Ros-Sokha.jpg?rlkey=3t0b4m3y31385l3r5aoltqbcx&st=ntr0u1t7&dl=1"
    },
    {
      name: "Mr. Kheav Sambath Thunthean",
      position: "Member",
      experience: [],
      qualifications: [],
      image: "https://www.dropbox.com/scl/fi/x57huw5ondf6u2uo455p7/Mr.-Kheav-SambathThunthean.png?rlkey=okuraw6gw9jwpkoo4vi3f7i7r&st=r3qvpoyq&dl=1"
    }
  ];

  const navigationItems = [
    { id: 'hero', label: 'Overview'},
    { id: 'vision-mission', label: 'Vision & Mission'},
    { id: 'board-members', label: 'Board Members', icon: '👥' },
    { id: 'chairman-message', label: 'Chairman\'s Message'},
    { id: 'capabilities', label: 'Capabilities'},
  ];

  const capabilities = [
    {
      icon: "🎯",
      title: "Tailored Training Programs",
      description: "Customized training programs for public and private sectors, focusing on business planning, strategy development, and essential soft skills.",
      color: "blue"
    },
    {
      icon: "🤖",
      title: "Pioneers in AI Skills Training",
      description: "First in Cambodia to offer comprehensive AI training programs, combining technical expertise with soft skills for public and corporate clients.",
      color: "green"
    },
    {
      icon: "📊",
      title: "Effective Training Model",
      description: "Understanding client needs through relationship building, needs assessment, customized solutions, training delivery, and follow-up coaching.",
      color: "purple"
    },
    {
      icon: "🏆",
      title: "Skills Development Fund Partner",
      description: "Trusted training partner of Skills Development Fund since 2023, offering SDF-funded programs to companies and public entities.",
      color: "orange"
    },
    {
      icon: "🌟",
      title: "Recognized Excellence",
      description: "Serving diverse clients across banking, trading, agriculture, marketing, media, logistics, food and beverages, education, and government ministries.",
      color: "red"
    },
    {
      icon: "💻",
      title: "On-site & E-learning Capabilities",
      description: "Comprehensive e-learning resources on website and YouTube, covering AI, leadership, strategy, innovation, finance, wellness, and sports.",
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <SidebarNavigation items={navigationItems} />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About DG Academy</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            The premier applied-AI education and innovation hub in Cambodia
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <div id="vision-mission">
        <VisionMissionSection />
      </div>

      {/* Board Members Section */}
      <div id="board-members">
        <BoardMembersSection members={boardMembers} />
      </div>

      {/* Chairman's Message */}
      <section id="chairman-message" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Message from Chairman</h2>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl font-medium mb-6 text-gray-900">
                Dear Respected Employers and Learners,
              </p>

              <p className="mb-4">
                I am very much grateful when you are reading my message. I am writing this letter to thank you for your dedication to develop your people and yourself and would like to encourage you keep doing this. You are working to develop people, with a strong passion to grow not only business but also people working for the business.
              </p>

              <p className="mb-4">
                With a vision to develop an innovative, intelligent, and entertaining digital education platform, where people can access and learn with convenience and effectiveness, DGacademy has started to offer free sharing from speakers with expertise for more than a year on different topics of interest to audience such as strategy, leadership, innovation, marketing, sales, finance, money, property, and health boosting programs such as running, cycling, and adventure. Our programs have received attention and we draw attention of partners, especially we air our contents in OneTV, a mainstream TV and digital TV in Cambodia.
              </p>

              <p className="mb-4">
                We are moving another step towards offering professional and skill development programs by cooperating with international and local trainers. They are top in their field with qualifications to train, develop, and coach learners to further achieve their career aspiration. We conduct in-house, public, and on our digital platform. We can accommodate to your needs of staff development with one-on-one coaching and follow-up. Meanwhile, our training can be conducted via online medium such as Zoom, at physical venue, or a blend of both to maximize use of time and resources.
              </p>

              <p className="mb-6">
                Please feel free to contact DGacademy at 095 666 788 (Telegram) to consult your needs with us. We need to understand your need first to go further fruitfully.
              </p>

              <p className="text-right font-medium">
                Sincerely Yours,<br />
                Mr. Chim Guanghui<br />
                Chairman, DG Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <div id="capabilities">
        <AboutSection
          title="Capabilities of DG Academy"
          subtitle="We excel in developing customized training programs and pioneering AI education in Cambodia, combining technical expertise with practical business skills."
          features={capabilities}
        />
      </div>
    </div>
  );
}