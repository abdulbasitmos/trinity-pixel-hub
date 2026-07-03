import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  db, 
  collection, 
  onSnapshot, 
  updateDoc, 
  addDoc, 
  doc, 
  deleteDoc 
} from '../firebase';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  LifeBuoy, 
  FileEdit, 
  Bell, 
  Lock, 
  TrendingUp, 
  DollarSign, 
  FolderGit2, 
  UserMinus, 
  UserCheck, 
  AlertCircle, 
  Check, 
  X, 
  Send,
  Plus,
  Trash2,
  Bookmark
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, openAuthModal } = useAuth();
  
  // Tab Navigation
  const [activeAdminTab, setActiveAdminTab] = useState('analytics');
  const [toast, setToast] = useState('');
  
  // Admin Data states
  const [allUsers, setAllUsers] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);

  // Forms for Content editing
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', category: '', tags: '', author: 'Trinity Pixel Admin', content: '', image: '' });
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Real-time synchronization for Admin DB
  useEffect(() => {
    if (!user || user.role !== 'Admin') return;

    // 1. Users
    const unsubUsers = onSnapshot(collection(db, 'tph_users'), (snap) => {
      setAllUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 2. Bookings
    const unsubBookings = onSnapshot(collection(db, 'tph_bookings'), (snap) => {
      setAllBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 3. Support Tickets
    const unsubTickets = onSnapshot(collection(db, 'tph_support_tickets'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllTickets(data);
      if (activeTicket) {
        const updated = data.find(t => t.id === activeTicket.id);
        if (updated) setActiveTicket(updated);
      }
    });

    // 4. Blogs
    const unsubBlogs = onSnapshot(collection(db, 'tph_blog_posts'), (snap) => {
      setAllBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 5. Testimonials
    const unsubTestimonials = onSnapshot(collection(db, 'tph_testimonials'), (snap) => {
      setAllTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 6. Admin notifications
    const unsubNotifs = onSnapshot(collection(db, 'tph_notifications'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const filtered = data.filter(n => n.email === 'admin@trinitypixelhub.com')
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setAdminNotifications(filtered);
    });

    return () => {
      unsubUsers();
      unsubBookings();
      unsubTickets();
      unsubBlogs();
      unsubTestimonials();
      unsubNotifs();
    };
  }, [user, activeTicket?.id]);

  // Analytics Metrics computation
  const metrics = useMemo(() => {
    const totalUsers = allUsers.length;
    const totalBookings = allBookings.length;
    const completedBookings = allBookings.filter(b => b.status === 'Completed').length;
    const conversionRate = totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : 0;
    
    // Revenue Estimate calculation (Budget fields parsed to number)
    const revenueSum = allBookings
      .filter(b => b.status === 'Completed' || b.status === 'In Progress' || b.status === 'Approved')
      .reduce((sum, b) => {
        const value = parseFloat((b.budget || '').replace(/[^0-9.]/g, '')) || 0;
        return sum + value;
      }, 0);

    const activeProjects = allBookings.filter(b => b.status === 'In Progress').length;
    const pendingRequests = allBookings.filter(b => b.status === 'Pending').length;

    return {
      totalUsers,
      totalBookings,
      conversionRate,
      revenueEstimate: `$${revenueSum.toLocaleString()}`,
      activeProjects,
      pendingRequests
    };
  }, [allUsers, allBookings]);

  // User Suspension/Access Toggles
  const handleToggleUserStatus = async (userDocId, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
      const userRef = doc(db, 'tph_users', userDocId);
      await updateDoc(userRef, { status: nextStatus });
      showToast(`User account status modified to: ${nextStatus}`);
    } catch (e) {
      showToast('Error altering user status.');
    }
  };

  const handleUpdateUserRole = async (userDocId, currentRole) => {
    try {
      const nextRole = currentRole === 'Admin' ? 'Client' : 'Admin';
      const userRef = doc(db, 'tph_users', userDocId);
      await updateDoc(userRef, { role: nextRole });
      showToast(`User role updated to: ${nextRole}`);
    } catch (e) {
      showToast('Error altering user role.');
    }
  };

  // Booking approvals/status alterations
  const handleAlterBookingStatus = async (bookingId, clientEmail, bookingTitle, status) => {
    try {
      const bRef = doc(db, 'tph_bookings', bookingId);
      await updateDoc(bRef, { status });

      // Notify Client
      await addDoc(collection(db, 'tph_notifications'), {
        email: clientEmail,
        title: `Booking Request Updated`,
        text: `Your booking for "${bookingTitle}" has been updated to: ${status}.`,
        read: false,
        timestamp: new Date().toISOString()
      });

      // Seed Project entry if In Progress
      if (status === 'In Progress') {
        const projectsSnap = await getDocs(collection(db, 'tph_projects'));
        const projectsList = projectsSnap.docs.map(d => d.data());
        const exists = projectsList.some(p => p.title.includes(bookingTitle));
        
        if (!exists) {
          await addDoc(collection(db, 'tph_projects'), {
            title: bookingTitle,
            clientEmail,
            status: 'In Progress',
            stage: 'Discovery Phase',
            progress: 10,
            assignedTeam: 'Web Dev Core Team',
            estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            milestones: [
              { name: 'Wireframing & Strategy', status: 'In Progress', date: new Date().toISOString().split('T')[0] },
              { name: 'UI / Design Rollout', status: 'Pending', date: '' },
              { name: 'Full-stack engineering', status: 'Pending', date: '' }
            ],
            notes: 'Project started. Lead coordinator assigned.',
            createdAt: new Date().toISOString()
          });
        }
      }

      showToast(`Booking updated to: ${status}`);
    } catch (e) {
      showToast('Error modifying booking status.');
    }
  };

  // Support replies
  const handleAdminTicketReply = async (e) => {
    e.preventDefault();
    if (!ticketReplyText.trim()) return;

    try {
      const ticketRef = doc(db, 'tph_support_tickets', activeTicket.id);
      const updatedReplies = [
        ...activeTicket.replies,
        {
          sender: user.email,
          senderName: 'Trinity Support Team',
          text: ticketReplyText,
          timestamp: new Date().toISOString()
        }
      ];

      await updateDoc(ticketRef, {
        replies: updatedReplies,
        status: 'Resolved'
      });

      // Notification to Client
      await addDoc(collection(db, 'tph_notifications'), {
        email: activeTicket.clientEmail,
        title: 'Support Ticket Reply',
        text: `Support team replied to your ticket: "${activeTicket.subject}".`,
        read: false,
        timestamp: new Date().toISOString()
      });

      setTicketReplyText('');
      showToast('Reply sent and ticket marked Resolved.');
    } catch (e) {
      showToast('Failed to reply to ticket.');
    }
  };

  // Content Creators (Blogs / Testimonials)
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      showToast('Fill in title and content.');
      return;
    }

    try {
      await addDoc(collection(db, 'tph_blog_posts'), {
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()),
        date: new Date().toISOString().split('T')[0],
        authorPic: user.photoURL,
        comments: []
      });

      setBlogForm({ title: '', excerpt: '', category: '', tags: '', author: 'Trinity Pixel Admin', content: '', image: '' });
      showToast('New blog post published!');
    } catch (e) {
      showToast('Error publishing blog post.');
    }
  };

  const handleTestimonialApproval = async (testId, isApproved) => {
    try {
      const tRef = doc(db, 'tph_testimonials', testId);
      if (isApproved) {
        await updateDoc(tRef, { status: 'approved' });
        showToast('Testimonial approved & listed.');
      } else {
        await deleteDoc(tRef);
        showToast('Testimonial dismissed.');
      }
    } catch (e) {
      showToast('Error updating testimonial.');
    }
  };

  if (!user || user.role !== 'Admin') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="inline-flex p-4 rounded-full bg-red-50 text-red-600 mb-6">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Gate locked</h1>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            Only authorized administrator credentials may access operational analytics, modify bookings, or respond to clients.
          </p>
          <div className="mt-8 rounded-2xl border bg-slate-50 p-4 text-xs text-left leading-relaxed text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Admin Demo Credentials:</p>
            <p>Username: <span className="text-cyan-600 font-bold">admin@trinitypixelhub.com</span></p>
            <p>Password: <span className="text-pink-600 font-bold">admin</span></p>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="flex-1 rounded-full border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition"
            >
              Back to Home
            </button>
            <button
              onClick={openAuthModal}
              className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-5 py-3.5 text-sm font-black text-white hover:opacity-95 shadow-lg transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pt-20">
      {/* Toast popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-bold">{toast}</span>
        </div>
      )}

      <div className="flex flex-1">
        {/* Admin Navigation Sidebar */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 space-y-6 text-white">
          <div className="px-2">
            <p className="text-xs font-black uppercase tracking-wider text-rose-500">Operation Panel</p>
            <h2 className="text-xl font-black text-white tracking-tight mt-1">Admin Dashboard</h2>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users, count: allUsers.length },
              { id: 'bookings', label: 'Bookings Management', icon: Calendar, count: allBookings.filter(b => b.status === 'Pending').length },
              { id: 'support', label: 'Support Tickets', icon: LifeBuoy, count: allTickets.filter(t => t.status === 'Open').length },
              { id: 'content', label: 'Content Management', icon: FileEdit },
              { id: 'alerts', label: 'System Notifications', icon: Bell, count: adminNotifications.length }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-rose-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                window.history.pushState({}, '', '/dashboard');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full flex items-center gap-3 px-4 py-3 mt-8 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white border border-dashed border-slate-800"
            >
              <span>Back to Client view</span>
            </button>
          </nav>
        </aside>

        {/* Dashboard Main Content area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Analytics View */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-800">Operational Analytics Overview</h3>
                <p className="text-slate-500 text-sm mt-1">Summary metrics for project conversions, user logs, and revenue generation.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Revenue Pipelines', value: metrics.revenueEstimate, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                  { label: 'Registered Clients', value: metrics.totalUsers, icon: Users, color: 'text-cyan-600 bg-cyan-50' },
                  { label: 'Total Bookings', value: metrics.totalBookings, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Conversion Factor', value: `${metrics.conversionRate}%`, icon: TrendingUp, color: 'text-rose-600 bg-rose-50' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{item.label}</span>
                      <p className="text-2xl font-black text-slate-800 mt-2">{item.value}</p>
                    </div>
                    <div className={`p-3.5 rounded-2xl ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                ))}
              </div>

              {/* More detailed charts breakdown */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-black text-slate-800 mb-6">Service Type Popularity</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Web Development', count: allBookings.filter(b => b.service === 'Web Development').length, percent: 55 },
                      { name: 'Graphic Design', count: allBookings.filter(b => b.service === 'Graphic Design').length, percent: 25 },
                      { name: 'Data Analysis', count: allBookings.filter(b => b.service === 'Data Analysis').length, percent: 15 },
                      { name: 'Branding & Identity', count: allBookings.filter(b => b.service === 'Branding & Identity').length, percent: 5 }
                    ].map((serv, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{serv.name}</span>
                          <span>{serv.count} bookings</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: `${serv.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-black text-slate-800 mb-6">Pipeline Projects Status</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Pending Requests', value: metrics.pendingRequests },
                      { label: 'Active Sprint Sprints', value: metrics.activeProjects },
                      { label: 'Closed Support Cases', value: allTickets.filter(t => t.status === 'Closed').length }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management View */}
          {activeAdminTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800">User Credentials Directory</h3>
                <p className="text-slate-500 text-sm mt-1">Suspend, activate, or assign system administrative flags to client accounts.</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-bold text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 border-b border-slate-100 uppercase tracking-wider">
                      <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="p-4 flex items-center gap-3">
                            <img src={u.photoURL} alt="" className="h-8 w-8 rounded-full object-cover" />
                            <div>
                              <p className="font-black text-slate-800">{u.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{u.email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-slate-500">{u.phone || 'No Phone'}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                              u.role === 'Admin' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                            }`}>{u.role}</span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                              u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            }`}>{u.status || 'Active'}</span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => handleToggleUserStatus(u.id, u.status || 'Active')}
                              className="text-[10px] font-black text-rose-500 hover:underline"
                            >
                              {u.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleUpdateUserRole(u.id, u.role)}
                              className="text-[10px] font-black text-blue-500 hover:underline"
                            >
                              Toggle Admin
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Booking Management View */}
          {activeAdminTab === 'bookings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800">Booking Intake Intake Queue</h3>
                <p className="text-slate-500 text-sm mt-1">Approve proposals, assign project teams, and alter operational statuses.</p>
              </div>

              <div className="space-y-4">
                {allBookings.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border text-slate-400">No bookings currently active in database.</div>
                ) : (
                  allBookings.map((b) => (
                    <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[9px] uppercase font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{b.service}</span>
                          <span className="text-[9px] uppercase font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">{b.status}</span>
                          <span className="text-[9px] text-slate-400">Client: <strong>{b.clientEmail}</strong></span>
                        </div>
                        <h4 className="text-base font-black text-slate-800">{b.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{b.description}</p>
                        <div className="flex gap-4 text-xs font-bold text-slate-400 pt-2">
                          <span>Budget: <strong className="text-slate-600">{b.budget}</strong></span>
                          <span>Deadline: <strong className="text-slate-600">{b.deadline}</strong></span>
                          {b.fileName && <span className="text-cyan-600 font-bold">Uploaded: {b.fileName}</span>}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {b.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleAlterBookingStatus(b.id, b.clientEmail, b.title, 'Approved')}
                              className="rounded-full bg-emerald-50 px-4 py-2.5 text-xs font-black text-emerald-600 hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAlterBookingStatus(b.id, b.clientEmail, b.title, 'Rejected')}
                              className="rounded-full bg-red-50 px-4 py-2.5 text-xs font-black text-red-600 hover:bg-red-100"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {b.status === 'Approved' && (
                          <button
                            onClick={() => handleAlterBookingStatus(b.id, b.clientEmail, b.title, 'In Progress')}
                            className="rounded-full bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-600 hover:bg-blue-100"
                          >
                            Mark In Progress
                          </button>
                        )}
                        {b.status === 'In Progress' && (
                          <button
                            onClick={() => handleAlterBookingStatus(b.id, b.clientEmail, b.title, 'Completed')}
                            className="rounded-full bg-cyan-50 px-4 py-2.5 text-xs font-black text-cyan-600 hover:bg-cyan-100"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Support Tickets Response Panel */}
          {activeAdminTab === 'support' && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-800">Support Ticket Inbox</h3>
                <div className="space-y-2">
                  {allTickets.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTicket(t)}
                      className={`w-full text-left p-4 rounded-3xl border transition flex items-center justify-between ${
                        activeTicket?.id === t.id ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex gap-2">
                          <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">{t.status}</span>
                          <span className="text-[9px] text-slate-400">#{t.id}</span>
                        </div>
                        <p className="text-xs font-black text-slate-800 mt-2">{t.subject}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Client: {t.clientName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat View */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[400px]">
                {activeTicket ? (
                  <div className="flex flex-col justify-between h-full flex-1">
                    <div>
                      <div className="border-b border-slate-100 pb-4 mb-4">
                        <span className="text-[10px] text-slate-400">TICKET DETAILS</span>
                        <h4 className="text-base font-black text-slate-800 mt-1">{activeTicket.subject}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Sender: {activeTicket.clientName} ({activeTicket.clientEmail})</p>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto p-2 bg-slate-50 rounded-2xl">
                        {activeTicket.replies?.map((rep, i) => {
                          const isSupport = rep.sender === 'admin@trinitypixelhub.com';
                          return (
                            <div key={i} className={`p-3 rounded-xl border ${isSupport ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-200'}`}>
                              <span className="text-[9px] font-black text-slate-500 block mb-1">{isSupport ? 'Trinity Support' : rep.senderName}</span>
                              <p className="text-xs leading-relaxed text-slate-700">{rep.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <form onSubmit={handleAdminTicketReply} className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                      <input 
                        type="text" 
                        value={ticketReplyText}
                        onChange={(e) => setTicketReplyText(e.target.value)}
                        placeholder="Type response, resolves ticket..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none text-xs font-medium"
                      />
                      <button 
                        type="submit" 
                        className="px-5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition text-xs font-bold"
                      >
                        Send Reply
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs py-20 text-center">
                    Select a support ticket from inbox to reply.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Management View */}
          {activeAdminTab === 'content' && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
              {/* Blog Form */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-800">Publish a Blog Article</h3>
                <form onSubmit={handleCreateBlog} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Post Title *</label>
                    <input 
                      type="text" 
                      value={blogForm.title}
                      onChange={(e) => setBlogForm(p => ({ ...p, title: e.target.value }))}
                      placeholder="e.g. Modern React Design scales"
                      className="w-full px-4 py-2 rounded-xl border text-xs font-medium text-slate-800"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Category</label>
                      <input 
                        type="text" 
                        value={blogForm.category}
                        onChange={(e) => setBlogForm(p => ({ ...p, category: e.target.value }))}
                        placeholder="e.g. Web Development"
                        className="w-full px-4 py-2 rounded-xl border text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Tags (comma separated)</label>
                      <input 
                        type="text" 
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm(p => ({ ...p, tags: e.target.value }))}
                        placeholder="React, CSS, Dev"
                        className="w-full px-4 py-2 rounded-xl border text-xs font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Excerpt / Brief Summary</label>
                    <input 
                      type="text" 
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm(p => ({ ...p, excerpt: e.target.value }))}
                      placeholder="Brief excerpt..."
                      className="w-full px-4 py-2 rounded-xl border text-xs font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Post Banner Image URL</label>
                    <input 
                      type="text" 
                      value={blogForm.image}
                      onChange={(e) => setBlogForm(p => ({ ...p, image: e.target.value }))}
                      placeholder="Https://images.unsplash.com/..."
                      className="w-full px-4 py-2 rounded-xl border text-xs font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Article Content *</label>
                    <textarea 
                      value={blogForm.content}
                      onChange={(e) => setBlogForm(p => ({ ...p, content: e.target.value }))}
                      rows="6"
                      placeholder="Support Markdown format..."
                      className="w-full px-4 py-2 rounded-xl border text-xs font-medium text-slate-800"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white text-xs font-black py-3 rounded-xl hover:bg-slate-800 transition"
                  >
                    Publish Post
                  </button>
                </form>
              </div>

              {/* Testimonials approval list */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-800">Moderation Desk: Testimonials</h3>
                <div className="space-y-3">
                  {allTestimonials.map((t) => (
                    <div key={t.id} className="p-4 rounded-2xl border border-slate-100 space-y-2 bg-slate-50/50">
                      <div className="flex justify-between items-center text-[10px] font-black">
                        <span className="text-slate-800">{t.name} ({t.role})</span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          t.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>{t.status}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{t.quote}"</p>
                      {t.status !== 'approved' && (
                        <div className="flex gap-2 pt-2 justify-end">
                          <button
                            onClick={() => handleTestimonialApproval(t.id, true)}
                            className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleTestimonialApproval(t.id, false)}
                            className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Admin Notifications View */}
          {activeAdminTab === 'alerts' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800">Admin Notification Center</h3>
                <p className="text-slate-500 text-sm mt-1">Audit log of system actions including client sign-ups and ticket submittals.</p>
              </div>

              {adminNotifications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">No notification alerts currently logged.</div>
              ) : (
                <div className="space-y-3">
                  {adminNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500">
                        <Bell className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-black text-slate-800">{notif.title}</h4>
                          <span className="text-[10px] text-slate-400">{new Date(notif.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1">{notif.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
