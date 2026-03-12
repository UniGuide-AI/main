-- SQL to create the resources table in Supabase

CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    subcategory TEXT[] DEFAULT '{}',
    university TEXT,
    province TEXT,
    city TEXT,
    contact_phone TEXT,
    email TEXT,
    website_url TEXT,
    address TEXT,
    eligibility TEXT[] DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',
    priority INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example data for Atlantic Canada MVP

INSERT INTO resources (service_name, description, category, subcategory, university, province, city, website_url, keywords, priority, contact_phone, email, address)
VALUES 
('Dalhousie Student Health & Wellness', 'Comprehensive health and mental health services for Dalhousie students.', 'Campus Services', '{"health", "mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/campus_life/health-and-wellness.html', '{"doctor", "counseling", "therapy", "medical"}', 1, '902-494-2171', 'shwc@dal.ca', NULL),

('SMU Counseling Centre', 'Free, confidential counseling services for Saint Mary''s University students.', 'Campus Services', '{"mental_health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/counselling-centre.html', '{"counseling", "therapy", "mental health", "stress"}', 1, '902-496-8778', 'counselling@smu.ca', NULL),

('UPEI Student Affairs', 'Support services for UPEI students including academic and personal support.', 'Campus Services', '{"academic", "health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs', '{"support", "student life", "help"}', 1, NULL, NULL, NULL),

('Feed Nova Scotia', 'A network of food banks and meal programs across Nova Scotia.', 'Community Services', '{"food"}', 'All', 'NS', 'Halifax', 'https://www.feednovascotia.ca/', '{"hunger", "food bank", "groceries", "meals"}', 2, NULL, NULL, NULL),

('Upper Room Food Bank', 'Providing food assistance to those in need in Charlottetown.', 'Community Services', '{"food"}', 'All', 'PEI', 'Charlottetown', 'https://urfb.ca/', '{"food", "hunger", "assistance"}', 2, NULL, NULL, NULL),

('NS Housing Support', 'Provincial programs for housing assistance and rent supplements.', 'Government Programs', '{"housing"}', 'All', 'NS', 'Halifax', 'https://housing.novascotia.ca/', '{"rent", "apartment", "shelter", "housing"}', 3, NULL, NULL, NULL),

('PEI Social Programs', 'Financial and housing support programs for residents of PEI.', 'Government Programs', '{"financial_aid", "housing"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/topic/social-programs', '{"money", "welfare", "support", "housing"}', 3, NULL, NULL, NULL),

-- New Dalhousie Resources
('Dalhousie On-Campus Residence', 'Housing & Campus Connections. Guaranteed residence for new students if applied by May 1.', 'Campus Services', '{"housing"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/housing/apply-for-residence.html', '{"residence", "dorm", "housing", "on-campus"}', 1, '902-494-1054', 'residence@dal.ca', NULL),

('Dalhousie Off-Campus Living Office (OCH)', 'Assistance finding apartments, understanding leases, landlord relations, and tenant rights.', 'Campus Services', '{"housing", "legal"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/off-campus-living.html', '{"apartment", "lease", "landlord", "tenant", "off-campus"}', 1, '902-494-2429', 'och@dal.ca', 'Room 1024, Risley Hall 1233 LeMarchant St.'),

('Dalhousie Same-Day Counselling', 'Mental health support available in-person, Zoom, or phone. Included with student health services.', 'Campus Services', '{"mental_health", "health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/health-andwellness/appointments/book-your-appointment.html', '{"counseling", "therapy", "mental health", "wellness"}', 1, '902-494-2171', NULL, NULL),

('Good2Talk', '24/7 Crisis Support (Free & Confidential) for all post-secondary students in Nova Scotia.', 'Community Services', '{"mental_health"}', 'All', 'NS', 'Halifax', 'https://good2talk.ca/', '{"crisis", "suicide", "emergency", "mental health", "24/7"}', 1, '1-833-292-3698', NULL, NULL),

('Dal Peer Support Services', 'Free, confidential, non-judgmental support from trained Dal Peer Support workers.', 'Campus Services', '{"mental_health"}', 'Dalhousie University', 'NS', 'Halifax', NULL, '{"peer support", "mental health", "student union"}', 2, NULL, NULL, 'Room 349 Student Union Building'),

('HealthyMindsNS', 'Free suite of online resources for post-secondary students in Nova Scotia.', 'Community Services', '{"mental_health"}', 'All', 'NS', 'Halifax', 'https://healthymindsns.ca/', '{"online", "mental health", "resources"}', 2, NULL, NULL, NULL),

('Dalhousie Studying for Success', 'Time management coaching, exam prep, note-taking strategies, and study skills development.', 'Campus Services', '{"academic"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/study-skills-tutoring.html', '{"tutoring", "study skills", "exam prep", "time management"}', 1, NULL, NULL, NULL),

('Dalhousie Writing Centre', 'Help with writing across all subjects, from first-year assignments to dissertations.', 'Campus Services', '{"academic"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/writing-support.html', '{"writing", "essays", "assignments", "grammar"}', 1, NULL, NULL, NULL),

('Dalhousie Academic Advising', 'Program planning assistance, course selection guidance, and degree requirement clarification.', 'Campus Services', '{"academic"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/academic-advising.html', '{"advising", "courses", "degree", "planning"}', 1, NULL, NULL, NULL),

('Dalhousie Bursary Programs', 'Special funding for students facing housing and food insecurity.', 'Campus Services', '{"financial_aid", "food", "housing"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/admissions/money_matters/awards-financial-aid/bursaries.html', '{"bursary", "funding", "money", "emergency", "food", "housing"}', 1, NULL, NULL, NULL),

('Loaded Ladle', 'Student-run service providing free vegan sustainable lunches multiple times per week.', 'Campus Services', '{"food"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.loadedladle.com/', '{"food", "vegan", "lunch", "free food", "sustainability"}', 1, NULL, NULL, NULL),

('Dalhousie Indigenous Student Centre', 'Drop-in study space, smudging ceremonies, elder support, and cultural programming.', 'Campus Services', '{"academic", "mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/indigenous-student-support.html', '{"indigenous", "aboriginal", "mi''kmaq", "culture", "smudging"}', 1, NULL, NULL, NULL),

('Dalhousie Black Student Advising Centre (BSAC)', 'Academic and advocacy support, study skills coaching, and mentorship for Black/African descent students.', 'Campus Services', '{"academic", "career"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/black-student-support.html', '{"black student", "african descent", "mentorship", "advocacy"}', 1, NULL, NULL, NULL),

-- New SMU Resources
('SMU Career and Experiential Learning', 'Career support, job search assistance, and experiential learning opportunities.', 'Campus Services', '{"career"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/career-services.html', '{"career", "jobs", "experience", "learning"}', 1, NULL, NULL, NULL),

('SMU Fred Smithers Centre', 'Support for students with disabilities and accessibility needs.', 'Campus Services', '{"academic", "health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/fred-smithers-centre.html', '{"accessibility", "disability", "accommodations", "support"}', 1, NULL, NULL, NULL),

('SMU Academic Advising', 'Academic program planning and course selection support.', 'Campus Services', '{"academic"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/academic-advising.html', '{"advising", "courses", "degree", "planning"}', 1, NULL, NULL, NULL),

('SMU International Student Centre', 'Support for international students including immigration and academic guidance.', 'Campus Services', '{"immigration", "academic"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/international/international-student-centre.html', '{"international", "visa", "immigration", "support"}', 1, NULL, NULL, NULL),

('SMU Community Food Room', 'Food assistance for students facing food insecurity.', 'Campus Services', '{"food"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/community-food-room.html', '{"food", "hunger", "groceries", "free food"}', 1, NULL, NULL, NULL),

('SMU Student Health Clinic', 'Medical services and health support for SMU students.', 'Campus Services', '{"health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/student-health-clinic.html', '{"doctor", "medical", "clinic", "health"}', 1, NULL, NULL, NULL),

-- Remaining Dalhousie Resources
('Togetherall', 'Safe, anonymous online peer community with self-assessments and mental health courses.', 'Community Services', '{"mental_health"}', 'All', 'NS', 'Halifax', 'https://togetherall.com/en-ca/join/novascotia', '{"peer support", "online", "mental health", "anonymous"}', 2, NULL, NULL, NULL),

('Tranquility', 'Online resource for mild to moderate anxiety and depression with interactive coaching.', 'Community Services', '{"mental_health"}', 'All', 'NS', 'Halifax', 'https://www.tranquility.app/novascotia', '{"anxiety", "depression", "online", "coaching", "mental health"}', 2, NULL, NULL, NULL),

('Dalhousie Group Wellness Programs', 'Available for students in Halifax and Truro. Includes group counselling and wellness workshops.', 'Campus Services', '{"mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/health-and-wellness/my-health/mental-health/group-counselling.html', '{"group therapy", "wellness", "workshops", "mental health"}', 2, NULL, NULL, NULL),

('Dalhousie PAWSitive Support', 'Free therapy dog sessions for mental health support through animal interaction.', 'Campus Services', '{"mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/health-and-wellness/my-health/workshops-and-events/pawsitive-support.html', '{"dogs", "therapy dogs", "stress", "mental health"}', 2, NULL, NULL, NULL),

('The Inquiring Mind', 'Free mental health training certificate program to recognize declining mental health and reduce stigma.', 'Campus Services', '{"mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/health-and-wellness/my-health/workshops-and-events/the-inquiring-mind.html', '{"training", "certificate", "stigma", "mental health"}', 3, NULL, NULL, NULL),

('Dalhousie Spiritual Support', 'Multifaith Services providing private spiritual counselling and access to a Spiritual Support Team.', 'Campus Services', '{"mental_health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/spiritual-support.html', '{"spiritual", "religion", "faith", "chaplain", "multifaith"}', 2, NULL, NULL, NULL),

('Ask a Nurse', 'Free service for health-related questions answered by a nurse, including mental health topics.', 'Community Services', '{"health"}', 'All', 'NS', 'Halifax', NULL, '{"nurse", "medical advice", "health", "questions"}', 2, NULL, NULL, NULL),

('Dalhousie Exam Support', 'Information on exam schedules, locations, conduct guidelines, and accommodation requests.', 'Campus Services', '{"academic"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/study/plan-your-degree/exams.html', '{"exams", "schedules", "accommodations", "testing"}', 2, NULL, NULL, NULL),

('Dalhousie 2SLGBTQ+ Resources', 'Support and resources for 2SLGBTQ+ students at Dalhousie.', 'Campus Services', '{"mental_health", "health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/health-and-wellness/my-health/lgbtq2sia.html', '{"lgbtq", "queer", "trans", "pride", "support"}', 2, NULL, NULL, NULL),

('Dalhousie Accessibility Services', 'Support for students with disabilities and accessibility accommodations.', 'Campus Services', '{"academic", "health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/life-at-dal/student-support/accessibility-accommodations.html', '{"accessibility", "disability", "accommodations", "support"}', 1, NULL, NULL, NULL),

('DalSafe', 'Campus security services, mobile app for alerts, and emergency contact information.', 'Campus Services', '{"legal", "health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://www.dal.ca/dept/dalsafe.html', '{"security", "safety", "emergency", "police", "alerts"}', 1, NULL, NULL, NULL),

('Dalplex', 'Athletics and recreation centre with gym facilities, fitness classes, and sports programs.', 'Campus Services', '{"health"}', 'Dalhousie University', 'NS', 'Halifax', 'https://athletics.dal.ca/facilities/Dalplex.html', '{"gym", "fitness", "sports", "recreation", "exercise"}', 2, NULL, NULL, NULL),

-- Remaining SMU Resources
('SMU Holy Cross Chaplaincy', 'Spiritual support and multifaith services for SMU students.', 'Campus Services', '{"mental_health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/holy-cross-chaplaincy.html', '{"spiritual", "religion", "faith", "chaplain"}', 2, NULL, NULL, NULL),

('SMU Muslim Student Association', 'Support and community for Muslim students at Saint Mary''s.', 'Campus Services', '{"mental_health"}', 'Saint Mary''s University', 'NS', 'Halifax', NULL, '{"muslim", "islam", "community", "religion"}', 2, NULL, NULL, NULL),

('SMU Black and African Descended Student Support', 'Academic and advocacy support for Black and African descended students.', 'Campus Services', '{"academic", "mental_health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/black-student-support.html', '{"black student", "african descent", "support", "advocacy"}', 1, NULL, NULL, NULL),

('SMU Indigenous Student Advising', 'Support and advising for Indigenous students at SMU.', 'Campus Services', '{"academic", "mental_health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/indigenous-student-support.html', '{"indigenous", "aboriginal", "support", "advising"}', 1, NULL, NULL, NULL),

('SMU Writing Help Online', 'Online writing assistance and resources for SMU students.', 'Campus Services', '{"academic"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/writing-centre.html', '{"writing", "essays", "online help", "assignments"}', 1, NULL, NULL, NULL),

('SMU Housing and Residence', 'On-campus housing and residence life support for SMU students.', 'Campus Services', '{"housing"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/housing-and-residence.html', '{"residence", "dorm", "housing", "on-campus"}', 1, NULL, NULL, NULL),

('SMU Sexual Violence Support Centre', 'Support, resources, and reporting options for those affected by sexual violence.', 'Campus Services', '{"mental_health", "legal"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/sexual-violence-support.html', '{"sexual violence", "support", "safety", "reporting"}', 1, NULL, NULL, NULL),

('SMU 2SLGBTQIA+ Resources', 'Support and resources for 2SLGBTQIA+ students at SMU.', 'Campus Services', '{"mental_health", "health"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/lgbtq-support.html', '{"lgbtq", "queer", "trans", "pride", "support"}', 2, NULL, NULL, NULL),

('SMU Peer Success Coaching', 'Peer-led coaching to help students achieve academic and personal success.', 'Campus Services', '{"academic"}', 'Saint Mary''s University', 'NS', 'Halifax', 'https://www.smu.ca/campus-life/peer-success-coaching.html', '{"peer coaching", "success", "academic support", "mentorship"}', 2, NULL, NULL, NULL);

-- UPEI & PEI Resources
INSERT INTO resources (service_name, description, category, subcategory, university, province, city, website_url, keywords, priority)
VALUES
('UPEI Student Affairs', 'Academic advising, coaching, and student support services.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs', '{"advising", "support", "coaching"}', 1),
('UPEI Robertson Library', 'Main library services for UPEI students.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://library.upei.ca', '{"library", "research", "study"}', 2),
('UPEI Writing Centre', 'Writing assistance for UPEI students.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/writing-centre', '{"writing", "essays", "grammar"}', 1),
('UPEI Student Success Centre', 'Resources and programs to help students succeed academically.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs/student-success', '{"success", "tutoring", "skills"}', 1),
('UPEI Accessibility Services', 'Support for students with disabilities and accessibility needs.', 'Campus Services', '{"academic", "health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/accessibility', '{"accessibility", "disability", "accommodations"}', 1),
('UPEI Experiential Education (Co-op)', 'Co-operative education and experiential learning opportunities.', 'Campus Services', '{"career", "academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/experiential-education', '{"co-op", "internship", "experience"}', 2),
('UPEI Career Services', 'Career planning and job search support.', 'Campus Services', '{"career"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/career-services', '{"career", "jobs", "resume"}', 1),
('UPEI Academic Calendar', 'Official academic dates, regulations, and course descriptions.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://calendar.upei.ca', '{"calendar", "dates", "courses"}', 2),
('UPEI Health and Wellness Centre', 'Provides medical services, screenings, and referrals to students.', 'Campus Services', '{"health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/health-centre', '{"doctor", "medical", "clinic", "health"}', 1),
('UPEI Counselling Services', 'Confidential counselling for mental health and personal concerns.', 'Campus Services', '{"mental_health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs/counselling', '{"counseling", "therapy", "mental health"}', 1),
('Health PEI Mental Health Services', 'Provincial mental health services and resources.', 'Government Programs', '{"mental_health"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/topic/mental-health', '{"mental health", "provincial", "support"}', 2),
('Island Helpline', '24/7 crisis line for Prince Edward Island.', 'Community Services', '{"mental_health"}', 'All', 'PEI', 'Charlottetown', 'https://www.theislandhelpline.com', '{"crisis", "helpline", "suicide", "24/7"}', 1),
('Mental Health & Addictions Phone Line', 'Provincial phone line for mental health and addictions support.', 'Government Programs', '{"mental_health"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/service/mental-health-and-addictions-phone-line', '{"addiction", "mental health", "phone line"}', 2),
('UPEI Crisis & Emergency Contacts', 'Emergency contact information for UPEI students.', 'Campus Services', '{"health", "legal"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/crisis-centre', '{"emergency", "crisis", "safety"}', 1),
('UPEI Campus Security', 'Security services for the UPEI campus.', 'Campus Services', '{"legal"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/security', '{"security", "safety", "police"}', 1),
('UPEI SAFE App', 'Campus safety app for alerts and emergency resources.', 'Campus Services', '{"legal"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/security/upei-safe', '{"app", "safety", "alerts"}', 2),
('UPEI Sexual Violence Prevention and Response Office', 'Support for survivors and safety planning.', 'Campus Services', '{"mental_health", "legal"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/svpro', '{"sexual violence", "support", "safety"}', 1),
('Community Legal Information Association of PEI', 'Legal information and resources for Prince Edward Island.', 'Community Services', '{"legal"}', 'All', 'PEI', 'Charlottetown', 'https://legalinfopei.ca', '{"legal", "law", "information"}', 2),
('UPEI International Student Office', 'Provides immigration and transition support for international students.', 'Campus Services', '{"immigration", "academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/international-students/iso', '{"international", "immigration", "visa"}', 1),
('Immigrant and Refugee Services Association PEI', 'Support services for immigrants and refugees in PEI.', 'Community Services', '{"immigration"}', 'All', 'PEI', 'Charlottetown', 'https://irsapei.ca', '{"immigrant", "refugee", "settlement"}', 2),
('PEI Connectors', 'Connecting newcomers to the PEI business community.', 'Community Services', '{"career"}', 'All', 'PEI', 'Charlottetown', 'https://peiconnectors.ca', '{"networking", "business", "jobs"}', 3),
('PEI Immigration Resources', 'Government resources for immigrating to Prince Edward Island.', 'Government Programs', '{"immigration"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/topic/immigrate', '{"immigration", "government", "resources"}', 3),
('Study and Stay PEI', 'Program to help international students stay and work in PEI after graduation.', 'Government Programs', '{"career", "immigration"}', 'All', 'PEI', 'Charlottetown', 'https://studyandstaypei.ca', '{"study and stay", "international", "jobs"}', 2),
('UPEI Student Financial Services', 'Financial aid, tuition, and student account services.', 'Campus Services', '{"financial_aid"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-financial-services', '{"money", "tuition", "financial aid"}', 1),
('PEI Student Financial Assistance', 'Provincial student loans and grants for PEI residents.', 'Government Programs', '{"financial_aid"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/information/workforce-advanced-learning-and-population/getting-a-student-loan', '{"loans", "grants", "money"}', 2),
('National Student Loans Service Centre', 'Federal student loan management.', 'Government Programs', '{"financial_aid"}', 'All', 'PEI', 'Charlottetown', 'https://www.csnpe-nslsc.canada.ca', '{"loans", "federal", "money"}', 2),
('UPEI Scholarships & Bursaries', 'Scholarships and bursaries available to UPEI students.', 'Campus Services', '{"financial_aid"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/scholarships', '{"scholarships", "bursaries", "money"}', 1),
('Canada Student Grants and Loans', 'Federal student aid programs.', 'Government Programs', '{"financial_aid"}', 'All', 'PEI', 'Charlottetown', 'https://www.canada.ca/en/services/benefits/education/student-aid.html', '{"grants", "loans", "federal"}', 2),
('UPEI Campus Food Bank', 'Food assistance for UPEI students.', 'Campus Services', '{"food"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs/chaplaincy-centre', '{"food", "hunger", "groceries"}', 1),
('Upper Room Hospitality Ministry', 'Providing free meals and food assistance in Charlottetown.', 'Community Services', '{"food"}', 'All', 'PEI', 'Charlottetown', 'https://upperroompei.com', '{"food", "meals", "hunger"}', 2),
('Salvation Army PEI Food Bank', 'Food assistance services in Charlottetown.', 'Community Services', '{"food"}', 'All', 'PEI', 'Charlottetown', 'https://salvationarmy.ca', '{"food", "assistance", "hunger"}', 2),
('Charlottetown Community Fridge', 'Free food available to the community.', 'Community Services', '{"food"}', 'All', 'PEI', 'Charlottetown', 'https://www.facebook.com/charlottetowncommunityfridge', '{"food", "free", "community"}', 3),
('PEI Food Banks', 'Network of food banks across Prince Edward Island.', 'Community Services', '{"food"}', 'All', 'PEI', 'Charlottetown', 'https://peifoodbanks.ca', '{"food banks", "hunger", "assistance"}', 2),
('UPEI Residence Life', 'On-campus housing and residence support.', 'Campus Services', '{"housing"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/residence', '{"residence", "dorm", "housing"}', 1),
('UPEI Off-Campus Housing', 'Resources for finding housing off-campus.', 'Campus Services', '{"housing"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/residence/off-campus-housing', '{"apartment", "off-campus", "housing"}', 1),
('PEI Housing Corporation', 'Provincial housing programs and assistance.', 'Government Programs', '{"housing"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/topic/housing', '{"housing", "provincial", "assistance"}', 2),
('Charlottetown Housing Authority', 'Housing services for the city of Charlottetown.', 'Government Programs', '{"housing"}', 'All', 'PEI', 'Charlottetown', 'https://charlottetown.ca/resident_services/housing', '{"housing", "city", "charlottetown"}', 2),
('WorkPEI', 'Employment resources and job board for Prince Edward Island.', 'Government Programs', '{"career"}', 'All', 'PEI', 'Charlottetown', 'https://workpei.ca', '{"jobs", "employment", "work"}', 2),
('Jobs PEI', 'Government of PEI job listings.', 'Government Programs', '{"career"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/topic/jobs', '{"jobs", "government", "careers"}', 2),
('PEI Career Development Services', 'Career counselling and employment support.', 'Community Services', '{"career"}', 'All', 'PEI', 'Charlottetown', 'https://www.careerdevelopment.pe.ca', '{"career", "jobs", "support"}', 2),
('Service Canada Student Jobs', 'Federal student employment programs.', 'Government Programs', '{"career"}', 'All', 'PEI', 'Charlottetown', 'https://www.canada.ca/en/services/jobs', '{"jobs", "federal", "students"}', 2),
('UPEI Chaplaincy Centre', 'Spiritual support and community for UPEI students.', 'Campus Services', '{"mental_health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://www.upei.ca/student-affairs/chaplaincy-centre', '{"spiritual", "chaplain", "community"}', 2),
('PEERS Alliance', 'Support and advocacy for the 2SLGBTQ+ community in PEI.', 'Community Services', '{"mental_health", "health"}', 'All', 'PEI', 'Charlottetown', 'https://peersalliance.ca', '{"lgbtq", "queer", "support"}', 2),
('Women’s Network PEI', 'Support and advocacy for women in Prince Edward Island.', 'Community Services', '{"mental_health", "career"}', 'All', 'PEI', 'Charlottetown', 'https://www.womensnetworkpei.com', '{"women", "advocacy", "support"}', 2),
('Big Brothers Big Sisters of PEI', 'Mentorship programs for youth.', 'Community Services', '{"mental_health"}', 'All', 'PEI', 'Charlottetown', 'https://pei.bigbrothersbigsisters.ca', '{"mentorship", "youth", "support"}', 3),
('Boys and Girls Club of Charlottetown', 'Programs and support for children and youth.', 'Community Services', '{"mental_health"}', 'All', 'PEI', 'Charlottetown', 'https://bgccharlottetown.ca', '{"youth", "community", "support"}', 3),
('UPEI Athletics & Recreation', 'Sports and fitness facilities for UPEI students.', 'Campus Services', '{"health"}', 'UPEI', 'PEI', 'Charlottetown', 'https://gopanthersgo.ca', '{"gym", "fitness", "sports"}', 2),
('UPEI Student Union', 'Student advocacy and services.', 'Campus Services', '{"academic", "financial_aid"}', 'UPEI', 'PEI', 'Charlottetown', 'https://upeisu.ca', '{"advocacy", "student union", "services"}', 1),
('UPEI Clubs & Societies', 'Student organizations at UPEI.', 'Campus Services', '{"academic"}', 'UPEI', 'PEI', 'Charlottetown', 'https://upeisu.ca/clubs', '{"clubs", "societies", "community"}', 2),
('Confederation Centre of the Arts', 'Arts and culture events in Charlottetown.', 'Community Services', '{"academic"}', 'All', 'PEI', 'Charlottetown', 'https://confederationcentre.com', '{"arts", "culture", "events"}', 3),
('211 PEI', 'Resource directory for social, community, and government services in PEI.', 'Community Services', '{"academic", "health", "housing", "food"}', 'All', 'PEI', 'Charlottetown', 'https://pe.211.ca', '{"directory", "resources", "help"}', 1),
('PEI Services Directory', 'Government of PEI services directory.', 'Government Programs', '{"academic", "health", "housing", "food"}', 'All', 'PEI', 'Charlottetown', 'https://www.princeedwardisland.ca/en/services', '{"government", "services", "directory"}', 2),
('Discover Charlottetown', 'Resources for students and newcomers in Charlottetown.', 'Community Services', '{"academic", "career"}', 'All', 'PEI', 'Charlottetown', 'https://discovercharlottetown.com', '{"newcomer", "charlottetown", "resources"}', 3);
