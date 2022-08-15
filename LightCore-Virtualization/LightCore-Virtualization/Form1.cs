using SuperSimpleTcp;
using System.Text;
using Newtonsoft.Json;

namespace LightCore_Virtualization
{
    public partial class Form1 : Form
    {
        
        private Panel[][] ledStripsVIRT;
        private const int LEDSTRIPS_COUNT = 4;
        private const int LED_COUNT = 100;
        private const int LED_COUNT_TRIANGLE = 60;
        private SimpleTcpServer server;
        private const int borderOffset = 100;
        public Form1()
        {
            //Init component storrage
            
            ledStripsVIRT = new Panel[5][];
            for (int x = 0; x < LEDSTRIPS_COUNT; x++)
            {
                ledStripsVIRT[x] = new Panel[LED_COUNT];

                for (int y = 0; y < LED_COUNT; y++)
                {
                    ledStripsVIRT[x][y] = null;
                }
            }
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            initUI();
            initTCPServer();
        }
        static void DataReceived(object sender, DataReceivedEventArgs e)
        {
            Console.WriteLine($"[{e.IpPort}]: {Encoding.UTF8.GetString(e.Data)}");
        }

        private void initTCPServer()
        {
            server = new SimpleTcpServer("127.0.0.1:9000");
            server.Events.DataReceived += IncomingData;
            server.Events.ClientConnected += Connected;
            server.Events.ClientDisconnected += Disconnected;
            server.Start();
            Console.WriteLine("TCPServer initialized");
        }

        static void Connected(object sender, ConnectionEventArgs e)
        {
            Console.WriteLine($"*** Server {e.IpPort} connected");
        }

        static void Disconnected(object sender, ConnectionEventArgs e)
        {
            Console.WriteLine($"*** Server {e.IpPort} disconnected");
        }

        private void initUI()
        {
            drawMiddleLED(0);
            drawTopLED(1);
            drawLeftTriangleLED(2);
            drawRightTriangleLED(3);
        }


        private void drawTopLED(int stripIndex)
        {
            int y = 0;
            for (int x = 0; x < LED_COUNT_TRIANGLE; x++)
            {
                Panel p = new Panel();
                p.Width = 8;
                p.Height = 8;
                p.Location = new System.Drawing.Point(x * 10 + borderOffset + 200, y + borderOffset);
                p.Visible = true;
                p.BackColor = Color.Red;
                this.Controls.Add(p);
                ledStripsVIRT[stripIndex][x] = p;
            }
        }
        private void drawLeftTriangleLED(int stripIndex)
        {
            int y = 0;
            for (int x = 0; x < LED_COUNT_TRIANGLE; x++)
            {
                Panel p = new Panel();
                p.Width = 8;
                p.Height = 8;
                p.Location = new System.Drawing.Point((int)(x * 10 * 50/100) + borderOffset + 200, (int)(x * 10 * 86/100) + borderOffset);
                p.Visible = true;
                p.BackColor = Color.Red;
                this.Controls.Add(p);
                ledStripsVIRT[stripIndex][x] = p;
            }
        }

        private void drawRightTriangleLED(int stripIndex)
        {
            int y = 0;
            for (int x = 0; x < LED_COUNT_TRIANGLE; x++)
            {
                Panel p = new Panel();
                p.Width = 8;
                p.Height = 8;
                p.Location = new System.Drawing.Point((int)800 - (x * 10 * 50 / 100) + borderOffset, (int)(x * 10 * 86 / 100) + borderOffset);
                p.Visible = true;
                p.BackColor = Color.Red;
                this.Controls.Add(p);
                ledStripsVIRT[stripIndex][x] = p;
            }
        }
        private void drawMiddleLED(int stripIndex)
        {
            int y = (int)(300 * 86/100) - 40;
            Console.WriteLine("Point Y:" + y);
            for (int x = 0; x < LED_COUNT; x++)
            {
                Console.WriteLine("Create Panel: " + x);
                Panel p = new Panel();
                p.Width = 8;
                p.Height = 8;
                p.Location = new System.Drawing.Point(x * 10 + borderOffset, y + borderOffset);
                p.Visible = true;
                p.BackColor = Color.Red;
                this.Controls.Add(p);
                ledStripsVIRT[stripIndex][x] = p;
            }
        }
        
        private void IncomingData(object sender, DataReceivedEventArgs e)
        {
            string dataString = Encoding.UTF8.GetString(e.Data);
            //Console.WriteLine("Incoming data: " + dataString);
            int[][] data = JsonConvert.DeserializeObject<int[][]>(dataString);
            for(int led = 0; led < LED_COUNT; led++)
            {
                int r = data[0][led];
                int g = data[1][led];
                int b = data[2][led];
                ledStripsVIRT[0][led].BackColor = Color.FromArgb(r, g, b);
            }
        }
    }
}