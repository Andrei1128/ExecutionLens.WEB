import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Log } from '../../_core/models/Log';
import mermaid from 'mermaid';
import Chart from 'chart.js/auto';
import { MatButton } from '@angular/material/button';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [MatButton, DateFormatPipe, MatCardModule, MatDividerModule],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.scss',
})
export class LogDetailsComponent implements OnInit {
  @ViewChild('sequenceDiagramDiv') sequenceDiagramElement:
    | ElementRef
    | undefined;

  methodsExecutionTimeChart: any | null = null;

  log: Log | null = null;

  ngOnInit() {
    this.initializeSequenceDiagram();

    this.createMethodsExecutionTimeChart();
    this.fetchMethodsExecutionTime();

    const sampleInput: object = {
      inputProperty1: 'value1',
      inputProperty2: 'value2',
      // Add more properties as needed
    };

    const sampleOutput: object = {
      outputProperty1: 'value1',
      outputProperty2: 'value2',
      // Add more properties as needed
    };

    this.log = {
      Id: '12sd56435tasd1231',
      Class: 'ExampleClass',
      Method: 'exampleMethod',
      HasException: false,
      EntryTime: new Date(),
      ExitTime: new Date(),
      Input: sampleInput,
      Output: sampleOutput,
      Informations: [
        'Information 1 for list 1',
        'Information 2 for list 1',
        'Information 3 for list 1',
        // Add more information as needed
      ],
      Interactions: [
        {
          Id: '12sd56435tasd1231',
          Class: 'InteractionClass1',
          Method: 'interactionMethod1',
          HasException: false,
          EntryTime: new Date(),
          ExitTime: new Date(),
          Input: {
            /* Object representing input */
          },
          Output: {
            /* Object representing output */
          },
          Informations: [],
          Interactions: [
            {
              Id: '12sd56435tasd1231',
              Class: 'ExampleClass',
              Method: 'exampleMethod',
              HasException: false,
              EntryTime: new Date(),
              ExitTime: new Date(),
              Input: sampleInput,
              Output: sampleOutput,
              Informations: [
                'Information 1 for list 2',
                'Information 2 for list 2',
                'Information 3 for list 2',
                // Add more information as needed
              ],
              Interactions: [],
            },
          ],
        },
        {
          Id: '12sd56435tasd1231',
          Class: 'InteractionClass2',
          Method: 'interactionMethod2',
          HasException: true,
          EntryTime: new Date(),
          ExitTime: new Date(),
          Input: {
            /* Object representing input */
          },
          Output: {
            /* Object representing output */
          },
          Informations: [
            'Information 1 for list 3',
            'Information 2 for list 3',
            'Information 3 for list 3',
            // Add more information as needed
          ],
          Interactions: [],
        },
        // Add more interaction logs as needed
      ],
    };

    const interaction1Input: object = {
      interaction1InputProperty1: 'value1',
      interaction1InputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction1Output: object = {
      interaction1OutputProperty1: 'value1',
      interaction1OutputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction2Input: object = {
      interaction2InputProperty1: 'value1',
      interaction2InputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction2Output: object = {
      interaction2OutputProperty1: 'value1',
      interaction2OutputProperty2: 'value2',
      // Add more properties as needed
    };

    // Update interactions with sample input and output objects
    this.log.Interactions[0].Input = interaction1Input;
    this.log.Interactions[0].Output = interaction1Output;
    this.log.Interactions[1].Input = interaction2Input;
    this.log.Interactions[1].Output = interaction2Output;
  }

  async initializeSequenceDiagram(): Promise<void> {
    const theme = `
      %%{
        init: {
          "width": "100%",
          "theme": "base",
          "themeVariables": {
            "primaryColor": "#212c4d",
            "secondaryColor": "#212c4d",
            "noteBkgColor": "#212c4d",

            "primaryBorderColor": "#717582",
            "noteBorderColor": "#b9bcc7",
            "activationBorderColor": "#b9bcc7",

            "primaryTextColor": "#b9bcc7",
            "noteTextColor": "#b9bcc7"
          }
        }
      }%%`;

    const graphDefinition = `
    sequenceDiagram
    actor ASs
    actor ASs2
    actor ASs3
    actor ASs4
    actor ASs5
    actor ASs6
    actor ASs44
    actor ASs52
    actor ASs61
    actor Alice
    actor Bob
    Alice->>Bob: Hi Bob
    Bob->>Alice: Hi Alice
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
    create actor A as Andrei
    create actor S as Sa`;

    const { svg, bindFunctions } = await mermaid.render(
      'sequenceDiagramSvg',
      theme + graphDefinition
    );

    const element: Element = this.sequenceDiagramElement?.nativeElement;

    element.innerHTML = svg;
    bindFunctions?.(element);
  }

  createMethodsExecutionTimeChart() {
    this.methodsExecutionTimeChart = new Chart('methodsExecutionTimeChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        plugins: {
          title: {
            text: 'Methods Execution Time',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
        },
      },
    });
  }

  fetchMethodsExecutionTime() {
    this.methodsExecutionTimeChart?.data.datasets.splice(
      0,
      this.methodsExecutionTimeChart?.data.datasets.length
    );
    this.methodsExecutionTimeChart?.data.labels?.splice(
      0,
      this.methodsExecutionTimeChart?.data.labels?.length
    );

    this.methodsExecutionTimeChart?.data.labels?.push(
      ...this.methodsExecutionTime.map((x) => x.method)
    );

    this.methodsExecutionTimeChart?.data.datasets.push({
      data: this.methodsExecutionTime.map((x) => x.value),
    });

    this.methodsExecutionTimeChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  methodsExecutionTime = [
    {
      method: 'CalculateMedian',
      value: 15,
    },
    {
      method: 'ComputeFactorial',
      value: 10,
    },
    {
      method: 'GeneratePrimeNumbers',
      value: 75,
    },
    {
      method: 'FindRoot',
      value: 35,
    },
    {
      method: 'CalculateExponential',
      value: 50,
    },
    {
      method: 'FindLargestPalindrome',
      value: 20,
    },
    {
      method: 'CalculateStandardDeviation',
      value: 12,
    },
  ];
}
